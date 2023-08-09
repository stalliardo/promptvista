import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

interface Params {
    params: {
        id: string;
    }
}

export const GET = async (req: Request, { params }: Params) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate("creator");

        if (!prompt) return new Response("Prompt not found", { status: 404 });

        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch the prompt", { status: 500 });
    }
}

export const PATCH = async (req: Request, { params }: Params) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const exisitingPrompt = await Prompt.findById(params.id);
        if (!exisitingPrompt) return new Response("Prompt not found", { status: 404 });

        exisitingPrompt.prompt = prompt;
        exisitingPrompt.tag = tag;
        await exisitingPrompt.save();

        return new Response(JSON.stringify(exisitingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update the prompt", { status: 500 });
    }
}

export const DELETE = async (req: Request, { params }: Params) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });

    } catch (error) {
        return new Response("Error deleting prompt", { status: 500 });
    }
}