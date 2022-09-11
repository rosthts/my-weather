#!/usr/bin/env node  // указывает что будет запуск нодой
import {getArgs} from './helpers/arg.js';
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError('Не передан token');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Токен сохранён');
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError('Не передан город');
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('Город сохранён');
	} catch (e) {
		printError(e.message);
	}
};

const gerForcast = async () => {
    try {
        const city = process.env.CITY || await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon)); //красивый вывод погоды
    } catch(e) {
        if(e.response.status == 404) {
            printError('Неверно указан город');
        } else if(e.response.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
    
};

const initCLI = () => {
    const args = getArgs(process.argv); //получение аргументов командой строки (process.argv)
 
    if (args.h) {    // Вывод help
        return printHelp();
    }
    if (args.s) { // Сохранить город
        return saveCity(args.s);
    }
    if (args.t) { // Сохранить токен
        return saveToken(args.t);
    }

    return gerForcast();
    // Вывести погоду
   
};

initCLI();