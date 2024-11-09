// src/components/Kanban/TarefaCard.js
import React, { useState } from 'react';

const TarefaCard = ({ task, onDragStart, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const getPriorityColor = (priority) => {
        switch(priority) {
            case 'high': return 'var(--accent)';
            case 'medium': return 'var(--secondary)';
            case 'low': return 'var(--neon)';
            default: return 'var(--secondary)';
        }
    };

    if (isEditing) {
        return (
            <div className="task-card editing">
                <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                    className="edit-input"
                />
                <input
                    type="text"
                    value={editedTask.client}
                    onChange={(e) => setEditedTask({...editedTask, client: e.target.value})}
                    placeholder="Cliente"
                    className="edit-input"
                />
                <input
                    type="text"
                    value={editedTask.responsible}
                    onChange={(e) => setEditedTask({...editedTask, responsible: e.target.value})}
                    placeholder="Responsável"
                    className="edit-input"
                />
                <input
                    type="date"
                    value={editedTask.deadline}
                    onChange={(e) => setEditedTask({...editedTask, deadline: e.target.value})}
                    className="edit-input"
                />
                <select
                    value={editedTask.priority}
                    onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                    className="edit-input"
                >
                    <option value="high">Alta</option>
                    <option value="medium">Média</option>
                    <option value="low">Baixa</option>
                </select>
                <textarea
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                    placeholder="Descrição"
                    className="edit-input"
                />
                <div className="edit-actions">
                    <button 
                        onClick={() => {
                            onUpdate(editedTask);
                            setIsEditing(false);
                        }}
                        className="btn-save"
                    >
                        Salvar
                    </button>
                    <button 
                        onClick={() => setIsEditing(false)}
                        className="btn-cancel"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div
            className="task-card"
            draggable
            onDragStart={(e) => onDragStart(e, task.id)}
        >
            <div className="task-header">
                <h4>{task.title}</h4>
                <div 
                    className="priority-indicator"
                    style={{ backgroundColor: getPriorityColor(task.priority) }}
                />
            </div>
            {task.client && (
                <div className="task-client">
                    Cliente: {task.client}
                </div>
            )}
            {task.description && (
                <div className="task-description">
                    {task.description}
                </div>
            )}
            <div className="task-footer">
                <div className="task-meta">
                    {task.responsible && <span>{task.responsible}</span>}
                    {task.deadline && <span>{new Date(task.deadline).toLocaleDateString()}</span>}
                </div>
                <div className="task-actions">
                    <button onClick={() => setIsEditing(true)}>
                        Editar
                    </button>
                    <button onClick={() => onDelete(task.id)}>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TarefaCard;
