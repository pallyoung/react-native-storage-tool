/**
 *@description 本地存储
 **/

"use strict"
import { AsyncStorage } from 'react-native';

/**
 * 
 * @description string to json
 * @param {any} value
 * @returns
 */
function parseJSON(value) {
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}
/**
 * 
 * @description json to string
 * @param {any} value
 * @returns
 */
function stringifyJSON(value) {
    try {
        return JSON.stringify(value);
    } catch (e) {
        return value;
    }
}

var StorageTool = {
    getAllKeys: AsyncStorage.getAllKeys,
    /**
     * 
     * 
     * @param {any} key
     * @param {any} value
     * @returns
     */
    setItem(key, value) {
        if (value == null) {
            return Promise.reject('null');
        }
        return AsyncStorage.setItem(key, stringifyJSON(value));
    },

    /**
     * 
     * 
     * @param {any} key
     * @returns
     */
    getItem(key) {
        if (!key) {
            return Promise.reject('null');
        }
        return AsyncStorage.getItem(key).
            then(function (value) {
                if (value == "0") {
                    return undefined;
                }
                return parseJSON(value);

            }, function (result) { return result });
    },

    /**
     * 
     * @description 
     * @returns
     */
    clear() {
        return AsyncStorage.clear();
    },

    /**
     * 
     * 
     * @param {any} key
     * @returns
     */
    removeItem(key) {
        return AsyncStorage.removeItem(key);
    },

    /**
     * 
     * @description 
     * @param {any} keys
     * @returns
     */
    multiGet(keys) {
        return AsyncStorage.multiGet(keys)
            .then(results => {
                return results.map(item => {
                    return [item[0], parseJSON(item[1])]
                });
            }, function (result) {
                return result;
            });
    },
    /**
     * 
     * @description remove by keys
     * @param {any} keys
     * @returns
     */
    multiRemove(keys) {
        return AsyncStorage.multiRemove(keys);
    }
}


export default StorageTool;
