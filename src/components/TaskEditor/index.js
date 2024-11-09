// src/components/TaskEditor/index.js
import React, { useState, useEffect } from 'react';
import './TaskEditor.css';

const TaskEditor = ({ task, onSave, onClose }) => {
   const [editedTask, setEditedTask] = useState(task || {
       title: '',
       client: '',
       responsible: '',
       deadline: '',
       priority: 'medium',
       type: 'default',
       description: '',
       status: 'backlog'
   });

   // Templates pré-definidos
   const taskTemplates = {
       arte_social: {
           title: 'Arte Social Media',
           description: 'Criação de arte para redes sociais',
           type: 'social_media'
       },
       plm: {
           title: 'PLM - Planejamento Mensal',
           description: 'Planejamento mensal de conteúdo',
           type: 'planning'
       },
       plc: {
           title: 'PLC - Planejamento de Campanha',
           description: 'Planejamento de campanha específica',
           type: 'campaign'
       },
       // Outros templates...
   };

   const handleTemplateSelect = (templateType) => {
       const template = taskTemplates[templateType];
       if (template) {
           setEditedTask(prev => ({
               ...prev,
               ...template
           }));
       }
   };

   return (
       <div className="task-editor-overlay">
           <div className="task-editor">
               <div className="editor-header">
                   <h3>{task ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
                   <button className="close-btn" onClick={onClose}>&times;</button>
               </div>

               {!task && (
                   <div className="template-selector">
                       <select 
                           onChange={(e) => handleTemplateSelect(e.target.value)}
                           className="template-select"
                       >
                           <option value="">Selecione um template</option>
                           <option value="arte_social">Arte Social Media</option>
                           <option value="plm">PLM - Planejamento Mensal</option>
                           <option value="plc">PLC - Planejamento de Campanha</option>
                           <option value="ple">PLE - Planejamento Especial</option>
                           <option value="pls">PLS - Planejamento Semanal</option>
                           <option value="webdesign">Webdesign</option>
                           <option value="bug">Bug</option>
                           <option value="ajuste_site">Ajuste Site</option>
                       </select>
                   </div>
               )}

               <form onSubmit={(e) => {
                   e.preventDefault();
                   onSave(editedTask);
               }}>
                   <div className="form-grid">
                       <div className="form-group">
                           <label>Título</label>
                           <input
                               type="text"
                               value={editedTask.title}
                               onChange={(e) => setEditedTask({...editedTask, title: e.target.value})}
                               required
                               className="form-input"
                           />
                       </div>

                       <div className="form-group">
                           <label>Cliente</label>
                           <input
                               type="text"
                               value={editedTask.client}
                               onChange={(e) => setEditedTask({...editedTask, client: e.target.value})}
                               className="form-input"
                           />
                       </div>

                       <div className="form-group">
                           <label>Responsável</label>
                           <input
                               type="text"
                               value={editedTask.responsible}
                               onChange={(e) => setEditedTask({...editedTask, responsible: e.target.value})}
                               className="form-input"
                           />
                       </div>

                       <div className="form-group">
                           <label>Data Limite</label>
                           <input
                               type="date"
                               value={editedTask.deadline}
                               onChange={(e) => setEditedTask({...editedTask, deadline: e.target.value})}
                               className="form-input"
                           />
                       </div>

                       <div className="form-group">
                           <label>Prioridade</label>
                           <select
                               value={editedTask.priority}
                               onChange={(e) => setEditedTask({...editedTask, priority: e.target.value})}
                               className="form-input"
                           >
                               <option value="high">Alta</option>
                               <option value="medium">Média</option>
                               <option value="low">Baixa</option>
                           </select>
                       </div>

                       <div className="form-group">
                           <label>Tipo</label>
                           <select
                               value={editedTask.type}
                               onChange={(e) => setEditedTask({...editedTask, type: e.target.value})}
                               className="form-input"
                           >
                               <option value="social_media">Social Media</option>
                               <option value="planning">Planejamento</option>
                               <option value="development">Desenvolvimento</option>
                               <option value="bug">Bug</option>
                               <option value="adjustment">Ajuste</option>
                           </select>
                       </div>
                   </div>

                   <div className="form-group full-width">
                       <label>Descrição</label>
                       <textarea
                           value={editedTask.description}
                           onChange={(e) => setEditedTask({...editedTask, description: e.target.value})}
                           className="form-input"
                           rows="4"
                       />
                   </div>

                   <div className="editor-actions">
                       <button type="button" className="btn-cancel" onClick={onClose}>
                           Cancelar
                       </button>
                       <button type="submit" className="btn-save">
                           Salvar
                       </button>
                   </div>
               </form>
           </div>
       </div>
   );
};

export default TaskEditor;
