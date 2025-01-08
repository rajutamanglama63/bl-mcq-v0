import { NextResponse } from 'next/server';
import { QuestionController, Question } from '@/app/controllers/questionController';

// CREATE - Add a new question
export async function POST(request: Request) {
    try {
        const question: Question = await request.json();
        const result = await QuestionController.createQuestion(question);
        console.log("res: ", result)
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to add question' },
            { status: 500 }
        );
    }
}

// READ - Get all questions
export async function GET() {
    try {
        const result = await QuestionController.getAllQuestions();
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to fetch questions' },
            { status: 500 }
        );
    }
}

// UPDATE - Update a question by ID
export async function PUT(request: Request) {
    try {
        const { id, ...updateData }: { id: string } & Partial<Question> = await request.json();
        const result = await QuestionController.updateQuestion(id, updateData);
        return NextResponse.json(result);
    } catch (error) {
        const status = error instanceof Error && error.message === 'Question not found' ? 404 : 500;
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to update question' },
            { status }
        );
    }
}

// DELETE - Delete a question by ID
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'Question ID is required' },
                { status: 400 }
            );
        }

        const result = await QuestionController.deleteQuestion(id);
        return NextResponse.json(result);
    } catch (error) {
        const status = error instanceof Error && error.message === 'Question not found' ? 404 : 500;
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : 'Failed to delete question' },
            { status }
        );
    }
}