import { db } from "@/app/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';

export type Question = {
    questionText: string;
    options: string[];
    correctAnswer: string;
}

export class QuestionController {
    // Create question
    static async createQuestion(question: Question) {
        try {
            const questionsRef = collection(db, 'questions');
            const docRef = await addDoc(questionsRef, {
                ...question,
                createdAt: new Date()
            });
            
            return {
                success: true,
                id: docRef.id,
                message: 'Question created successfully'
            };
        } catch (error) {
            console.error('Error adding question:', error);
            throw new Error('Failed to add question');
        }
    }

    // Get all questions
    static async getAllQuestions() {
        try {
            const questionsRef = collection(db, 'questions');
            const querySnapshot = await getDocs(questionsRef);
            const questions = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            return { success: true, questions };
        } catch (error) {
            console.error('Error fetching questions:', error);
            throw new Error('Failed to fetch questions');
        }
    }

    // Update question
    static async updateQuestion(id: string, updateData: Partial<Question>) {
        try {
            const questionRef = doc(db, 'questions', id);
            
            // Check if document exists
            const questionDoc = await getDoc(questionRef);
            if (!questionDoc.exists()) {
                throw new Error('Question not found');
            }

            await updateDoc(questionRef, {
                ...updateData,
                updatedAt: new Date()
            });
            
            return {
                success: true,
                message: 'Question updated successfully'
            };
        } catch (error) {
            console.error('Error updating question:', error);
            throw error;
        }
    }

    // Delete question
    static async deleteQuestion(id: string) {
        try {
            const questionRef = doc(db, 'questions', id);
            
            // Check if document exists
            const questionDoc = await getDoc(questionRef);
            if (!questionDoc.exists()) {
                throw new Error('Question not found');
            }

            await deleteDoc(questionRef);
            
            return {
                success: true,
                message: 'Question deleted successfully'
            };
        } catch (error) {
            console.error('Error deleting question:', error);
            throw error;
        }
    }
}