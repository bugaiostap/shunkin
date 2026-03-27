// pages/api/sendMessage.ts

import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

// Ваш Telegram API токен и ID группы
const TELEGRAM_GROUP_ID = -4777213267;
const bot = new Telegraf('7019483337:AAFSPcgF61IcSmipVhK7xQHtbYdBTvHM4gI');

// Тип для сообщения с данными
interface DataMessage {
    data: {
        name: string;
        subject: string;
        message: string;
    };
}

// Тип для сообщения с адресом
interface AddressMessage {
    address: string;
}

// Объединенный тип для всех возможных типов сообщений
type Message = DataMessage | AddressMessage;

async function sendTelegramMessage(message: Message) {
    try {
        let formattedMessage = "";

        // Проверяем, если у объекта есть ключ 'data' (для DataMessage)
        if ("data" in message) {
            const { name, subject, message: msg } = message.data;
            formattedMessage = ` Пользователь отправил сообщение:\nName: ${name}\nEmail: ${subject}\nMessage: ${msg}`;
        }
        // Проверяем, если у объекта есть ключ 'address' (для AddressMessage)
        else if ("address" in message) {
            formattedMessage = `Пользователь отправил email:\n ${message.address}`;
        }
        // Если сообщение не соответствует этим типам, генерируем строку JSON
        else {
            formattedMessage = JSON.stringify(message, null, 2);
        }

        await bot.telegram.sendMessage(TELEGRAM_GROUP_ID, formattedMessage);
        console.log(`Сообщение успешно отправлено: ${message}`);
    } catch (error) {
        console.error(`Неожиданная ошибка при отправке сообщения: ${error}`);
    }
}

export async function POST(request: NextRequest) {
    try {
        // Parse the JSON body of the request
        const data = await request.json();
        console.log(data);

        // Process the data as needed
        await sendTelegramMessage(data);

        // Respond with a success message
        return NextResponse.json({ message: 'Success' }, { status: 200 });
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

