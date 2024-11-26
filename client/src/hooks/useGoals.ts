import { useState } from 'react';
import { Goal } from '../types/types'

export const useGoals = () => {
    const [goals, setGoals] = useState<Goal[]>([]);

    const addGoal = (goal: Goal) => {
        setGoals((prevGoals) => [...prevGoals, goal]);
    }

    const deleteGoal = (id: string) => {
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
    }

    const completeGoal = (id: string) => {
        setGoals((prevGoals) =>
            prevGoals.map((goal) =>
                goal.id === id ? {...goal, isCompleted: !goal.isCompleted} : goal
            )
        );
    }

    return { goals, addGoal, deleteGoal, completeGoal }
}