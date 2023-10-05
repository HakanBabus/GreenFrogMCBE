#include <napi.h>
#include <iostream>
#include <vector>
#include <ctime>

// Remove this if you don't need debug
#define DEBUG

#define MAX_POSSIBLE_SPAWN_COORDINATES 15
#define MAX_X_COORDINATE 30
#define SPAWN_Y_COORDINATE -50
#define MAX_Z_COORDINATE 30
#define MAX_RANDOM 5

#define CHANCE 3
#define NIGHT_TIME 1600

using namespace std;
using namespace Napi;

struct Vec2 {
    int x;
    int z;
};

vector<Vec2> spawnCoordinates(MAX_POSSIBLE_SPAWN_COORDINATES);

void debugLog(string message) {
    #ifdef DEBUG
        cout << "EntityDebug | " << message << endl;
    #endif
}

void pregenerateRandomCoordinates() {
    for (int coordinate = 0; coordinate < MAX_POSSIBLE_SPAWN_COORDINATES; coordinate++) {
        debugLog("Pregenerated a random Vec2");

        spawnCoordinates[coordinate].x = rand() % MAX_X_COORDINATE;
        spawnCoordinates[coordinate].z = rand() % MAX_Z_COORDINATE;
    }
}

Vec2 _getRandomSpawnCoordinate() {
    int coordinate = rand() % MAX_POSSIBLE_SPAWN_COORDINATES;

    return spawnCoordinates[coordinate];
}

bool _shouldSpawnHostileEntity(int time) {
    #ifdef DEBUG
        return true;
    #else 
        return (time > NIGHT_TIME && (rand() % MAX_RANDOM) > CHANCE);
    #endif
}

int _getRandomRuntimeId() {
    return rand();
}

Value getRandomSpawnCoordinate(const CallbackInfo& info) {
    Env env = info.Env();

    Vec2 coordinate = _getRandomSpawnCoordinate();
    
    Object result = Object::New(env);

    result["x"] = Number::New(env, coordinate.x);
    result["y"] = Number::New(env, SPAWN_Y_COORDINATE);
    result["z"] = Number::New(env, coordinate.z);

    return result;
}

Value shouldSpawnHostileEntity(const CallbackInfo& info) {
    Env env = info.Env();

    int time = info[0].As<Number>().Int32Value();

    return Boolean::New(env, _shouldSpawnHostileEntity(time));
}

Value getRandomRuntimeId(const CallbackInfo& info) {
    Env env = info.Env();

    return Number::New(env, _getRandomRuntimeId());
}

Object init(Env env, Object exports) {
    debugLog("Initializing...");

    srand(time(NULL));

    pregenerateRandomCoordinates();

    exports["getRandomSpawnCoordinate"] = Function::New(env, getRandomSpawnCoordinate);
    exports["shouldSpawnHostileEntity"] = Function::New(env, shouldSpawnHostileEntity);
    exports["getRandomRuntimeId"] = Function::New(env, getRandomRuntimeId);

    debugLog("Initialized!");

    return exports;
}

NODE_API_MODULE(addon, init)
