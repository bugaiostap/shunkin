import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

const awsRegion = process.env.AWS_REGION ?? process.env.NEXT_PUBLIC_AWS_REGION;
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID ?? process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const awsSecretAccessKey =
    process.env.AWS_SECRET_ACCESS_KEY ?? process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const awsBucketName = process.env.AWS_S3_BUCKET_NAME ?? process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

const s3 = new S3Client({
    region: awsRegion,
    credentials:
        awsAccessKeyId && awsSecretAccessKey
            ? {
                  accessKeyId: awsAccessKeyId,
                  secretAccessKey: awsSecretAccessKey,
              }
            : undefined,
});

// Тип для слайда
interface Slide {
    id?: number;
    title: string;
    area: string;
    rooms: string;
    offer: string;
    address: string;
    images: string[];
}

// 🔹 Получить все слайды
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM slides");
        console.log(rows);
        
        const slides = (rows as any[]).map((slide) => ({
            ...slide,
            images: slide.images,
        }));
        return NextResponse.json(slides);
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при получении слайдов" }, { status: 500 });
    }
}

// 🔹 Добавить слайд
export async function POST(req: Request) {
    try {
        if (!awsBucketName) {
            throw new Error("AWS S3 bucket name is not configured");
        }

        const formData = await req.formData();
        const title = formData.get("title") as string;
        const area = formData.get("area") as string;
        const rooms = formData.get("rooms") as string;
        const address = formData.get("address") as string;
        const offer = formData.get("offer") as string;
        const files = formData.getAll("images") as File[];

        const uploadedUrls: string[] = [];

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const key = `property-photos/${Date.now()}-${file.name}`;

            const upload = new Upload({
                client: s3,
                params: {
                    Bucket: awsBucketName,
                    Key: key,
                    Body: buffer,
                    ContentType: file.type,
                },
            });

            const uploadResult = await upload.done();
            const uploadedLocation =
                uploadResult.Location ??
                (awsRegion
                    ? `https://${awsBucketName}.s3.${awsRegion}.amazonaws.com/${key}`
                    : `https://${awsBucketName}.s3.amazonaws.com/${key}`);

            uploadedUrls.push(uploadedLocation);
        }

        const [result] = await pool.query(
            "INSERT INTO slides (title, area, rooms, address, images ,offer) VALUES (?, ?, ?, ?, ?, ?)",
            [title, area, rooms, address, JSON.stringify(uploadedUrls), offer]
        );

        return NextResponse.json({ id: (result as any).insertId, title, area, rooms, address, images: uploadedUrls });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при добавлении" }, { status: 500 });
    }
}

// 🔹 Удалить слайд
export async function DELETE(req: Request) {
    try {
        const { id }: { id: number } = await req.json();
        await pool.query("DELETE FROM slides WHERE id = ?", [id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Ошибка при удалении" }, { status: 500 });
    }
}
