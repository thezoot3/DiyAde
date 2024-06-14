/* Simple HTTP Server Example

   This example code is in the Public Domain (or CC0 licensed, at your option.)

   Unless required by applicable law or agreed to in writing, this
   software is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
   CONDITIONS OF ANY KIND, either express or implied.
*/

#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include "esp_log.h"
#include <nvs_flash.h>
#include <sys/param.h>
#include "esp_netif.h"
#include "protocol_examples_common.h"
#include "protocol_examples_utils.h"
#include "esp_tls_crypto.h"
#include <esp_http_server.h>
#include "esp_event.h"
#include "esp_tls.h"
#include <string.h>
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "esp_mac.h"
#include "esp_wifi.h"

#include "lwip/err.h"
#include "lwip/sys.h"

#include "driver/gpio.h"

#include "main.h"

const char* lemon = "lemon";
const char* grapefruit = "grapefruit";
const char* green_grape = "green_grape";
const char* done = "done";


#define EXAMPLE_HTTP_QUERY_KEY_MAX_LEN  (64)


/* A simple example that demonstrates how to create GET and POST
 * handlers for the web server.
 */

static const char *TAG = "AdeServer";

void signal_gpio(const char* dec_param) {
    int pin = 0;
    if(strcmp(dec_param, lemon) == 0) {
        pin = 25;
    } else  if(strcmp(dec_param, grapefruit) == 0) {
        pin = 26;
    } else  if(strcmp(dec_param, green_grape) == 0) {
        pin = 32;
    } else  if(strcmp(dec_param, done) == 0) {
        pin = 33;
    }
    gpio_set_direction(pin, GPIO_MODE_OUTPUT);
        gpio_set_pull_mode(pin, GPIO_PULLDOWN_ONLY);
        gpio_set_level(pin, 1);
        gpio_set_level(pin, 0);
    
}
void signal_serial(char* prefix, char* name) {
    char* message = malloc(strlen(prefix) + strlen(name) + 4);
    strcpy(message, prefix);
    strcat(message, " ");
    strcat(message, name);
    strcat(message, "\n");
    printf(message);
    free(message);
}

static esp_err_t button_activated(httpd_req_t *req)
{
    char*  buf;
    size_t buf_len;
    buf_len = httpd_req_get_url_query_len(req) + 1;
    if (buf_len > 1) {
        buf = malloc(buf_len);
        if (httpd_req_get_url_query_str(req, buf, buf_len) == ESP_OK) {
            ESP_LOGI(TAG, "Found URL query => %s", buf);
            char param[EXAMPLE_HTTP_QUERY_KEY_MAX_LEN], dec_param[EXAMPLE_HTTP_QUERY_KEY_MAX_LEN] = {0};
            if (httpd_query_key_value(buf, "btn", param, sizeof(param)) == ESP_OK) {
                example_uri_decode(dec_param, param, strnlen(param, EXAMPLE_HTTP_QUERY_KEY_MAX_LEN));
                signal_gpio(dec_param);
            } else {
                
            }
        }
        free(buf);
    }
    httpd_resp_send(req, "error", HTTPD_RESP_USE_STRLEN);
    return ESP_OK;
}

static const httpd_uri_t btn_activate = {
    .uri       = "/btn_activate",
    .method    = HTTP_GET,
    .handler   = button_activated,
};
//button_deactivate handler
static esp_err_t button_deactivated(httpd_req_t *req)
{
    char*  buf;
    size_t buf_len;
    buf_len = httpd_req_get_url_query_len(req) + 1;
    if (buf_len > 1) {
        buf = malloc(buf_len);
        if (httpd_req_get_url_query_str(req, buf, buf_len) == ESP_OK) {
            char param[EXAMPLE_HTTP_QUERY_KEY_MAX_LEN], dec_param[EXAMPLE_HTTP_QUERY_KEY_MAX_LEN] = {0};
            if (httpd_query_key_value(buf, "btn", param, sizeof(param)) == ESP_OK) {
                example_uri_decode(dec_param, param, strnlen(param, EXAMPLE_HTTP_QUERY_KEY_MAX_LEN));
                signal_gpio(dec_param);
            }
        }
        free(buf);
    }
    httpd_resp_send(req, "error", HTTPD_RESP_USE_STRLEN);
    return ESP_OK;
}
static const httpd_uri_t btn_deactivate = {
    .uri       = "/btn_deactivate",
    .method    = HTTP_GET,
    .handler   = button_deactivated,
};
static httpd_handle_t start_webserver(void)
{
    httpd_handle_t server = NULL;
    httpd_config_t config = HTTPD_DEFAULT_CONFIG();
    config.lru_purge_enable = true;
    ESP_LOGI(TAG, "Starting server on port: '%d'", config.server_port);
    if (httpd_start(&server, &config) == ESP_OK) {
        ESP_LOGI(TAG, "Registering URI handlers");
        httpd_register_uri_handler(server, &btn_activate);
        httpd_register_uri_handler(server, &btn_deactivate);
        return server;
    }
    ESP_LOGI(TAG, "Error starting server!");
    return NULL;
}

static void wifi_event_handler(void* arg, esp_event_base_t event_base,int32_t event_id, void* event_data)
{
    if (event_id == WIFI_EVENT_AP_STACONNECTED) {
        wifi_event_ap_staconnected_t* event = (wifi_event_ap_staconnected_t*) event_data;
        ESP_LOGI("Wifi", "station "MACSTR" join, AID=%d", MAC2STR(event->mac), event->aid);
    } else if (event_id == WIFI_EVENT_AP_STADISCONNECTED) {
        wifi_event_ap_stadisconnected_t* event = (wifi_event_ap_stadisconnected_t*) event_data;
        ESP_LOGI("Wifi", "station "MACSTR" leave, AID=%d, reason=%d", MAC2STR(event->mac), event->aid, event->reason);
    } else if(event_id == WIFI_EVENT_AP_START) {
        ESP_LOGI("Wifi", "Soft-AP started");
        ESP_LOGI(TAG, "Starting webserver");
        start_webserver();
    }
}

void wifi_init(void) {
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());
    esp_netif_create_default_wifi_ap();
    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    ESP_ERROR_CHECK(esp_wifi_init(&cfg));
    ESP_ERROR_CHECK(esp_event_handler_instance_register(WIFI_EVENT,ESP_EVENT_ANY_ID,&wifi_event_handler,NULL,NULL));
    wifi_config_t wifi_config = {
        .ap = {
            .ssid = ade_wifi_ssid,
            .ssid_len = strlen(ade_wifi_ssid),
            .channel = 0,
            .password = ade_wifi_pass,
            .max_connection = ade_wifi_max_conn,
            .authmode = WIFI_AUTH_WPA2_PSK,
        },
    };
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_AP));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_AP, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());
}
void app_main(void)
{
    esp_err_t ret = nvs_flash_init();
    if (ret == ESP_ERR_NVS_NO_FREE_PAGES || ret == ESP_ERR_NVS_NEW_VERSION_FOUND) {
      ESP_ERROR_CHECK(nvs_flash_erase());
      ret = nvs_flash_init();
    }
    ESP_ERROR_CHECK(ret);
    wifi_init();

}
