// src/components/Kanban/index.js - Atualizado
import React, { useState, useEffect } from 'react';
import TarefaCard from './TarefaCard';
import TaskEditor from '../TaskEditor';
import './Kanban.css';

const Kanban = () => {
    const lanes = ['backlog', 'todo', 'doing', 'approval', 'done'];
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('integrare_tasks');
        return saved ? JSON.parse(saved) : [];
    });

    // Estados para o modal de edição
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        localStorage.setItem('integrare_tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Funções de Drag & Drop
    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData('taskId', taskId);
        e.target.classList.add('dragging');
    };

    const handleDragEnd = (e) => {
        e.target.classList.remove('dragging');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.currentTarget.classList.remove('drag-over');
    };

    const handleDrop = (e, lane) => {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');
        const taskId = e.dataTransfer.getData('taskId');
        
        const updatedTasks = tasks.map(task => 
            task.id === taskId ? { ...task, status: lane } : task
        );
        setTasks(updatedTasks);
    };

    // Funções do Editor
    const openEditor = (task = null) => {
        setEditingTask(task);
        setIsEditorOpen(true);
    };

    const closeEditor = () => {
        setEditingTask(null);
        setIsEditorOpen(false);
    };

    const handleSaveTask = (taskData) => {
        if (editingTask) {
            // Atualizar tarefa existente
            setTasks(tasks.map(task => 
                task.id === editingTask.id ? { ...task, ...taskData } : task
            ));
        } else {
            // Criar nova tarefa
            setTasks([...tasks, { 
                ...taskData, 
                id: Date.now().toString(),
                status: 'backlog'
            }]);
        }
        closeEditor();
    };

    const handleDeleteTask = (taskId) => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
            setTasks(tasks.filter(task => task.id !== taskId));
        }
    };

    return (
        <div className="kanban-container">
            <div className="kanban-header">
                <h2>Gestão de Tarefas</h2>
                <div className="kanban-actions">
                    <button 
                        className="btn-new-task" 
                        onClick={() => openEditor()}
                    >
                        Nova Tarefa
                    </button>
                    <div className="filters">
                        <input 
                            type="text" 
                            placeholder="Buscar tarefa..."
                            className="search-input"
                        />
                    </div>
                </div>
            </div>

            <div className="kanban-board">
                {lanes.map(lane => (
                    <div 
                        key={lane}
                        className="kanban-lane"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, lane)}
                    >
                        <div className="lane-header">
                            <h3>{lane.charAt(0).toUpperCase() + lane.slice(1)}</h3>
                            <span className="task-count">
                                {tasks.filter(task => task.status === lane).length}
                            </span>
                        </div>
                        <div className="lane-content">
                            {tasks
                                .filter(task => task.status === lane)
                                .map(task => (
                                    <TarefaCard
                                        key={task.id}
                                        task={task}
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                        onEdit={() => openEditor(task)}
                                        onDelete={() => handleDeleteTask(task.id)}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>

            {isEditorOpen && (
                <TaskEditor 
                    task={editingTask}
                    onSave={handleSaveTask}
                    onClose={closeEditor}
                />
            )}
        </div>
    );
};

export default Kanban;
