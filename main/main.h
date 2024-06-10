
#define ade_wifi_max_conn 3
#define ade_wifi_ssid "AdeServer"
#define ade_wifi_pass "abcd1234"

#define button_number 4

typedef struct {
    const char* name;
    int pin;
} button_t;

static char* button_names[button_number] = {
    "lemon",
    "grapefruit",
    "green_grape",
    "stop"
};

static button_t button_map[button_number] = {
    {"lemon", 32},
    {"grapefruit", 33},
    {"green_grape", 34},
    {"stop", 35}
};

