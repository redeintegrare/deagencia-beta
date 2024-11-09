// src/components/SocialMedia/index.js
import React, { useState, useEffect } from 'react';
import MediaSlot from './MediaSlot';
import './SocialMedia.css';

const SocialMedia = () => {
   const [planningData, setPlanningData] = useState(() => {
       const saved = localStorage.getItem('integrare_social_media');
       return saved ? JSON.parse(saved) : {
           theme: '',
           objectives: '',
           clientId: '',
           slots: Array(12).fill({
               title: '',
               image: null,
               description: '',
               status: 'draft' // draft, review, approved
           })
       };
   });

   // Salvar automaticamente
   useEffect(() => {
       localStorage.setItem('integrare_social_media', JSON.stringify(planningData));
   }, [planningData]);

   const handleImageUpload = (index, file) => {
       const reader = new FileReader();
       reader.onload = (e) => {
           const newSlots = [...planningData.slots];
           newSlots[index] = {
               ...newSlots[index],
               image: e.target.result
           };
           setPlanningData({...planningData, slots: newSlots});
       };
       reader.readAsDataURL(file);
   };

   const handleSlotUpdate = (index, data) => {
       const newSlots = [...planningData.slots];
       newSlots[index] = {
           ...newSlots[index],
           ...data
       };
       setPlanningData({...planningData, slots: newSlots});
   };

   const handleSendToApproval = (index) => {
       const slot = planningData.slots[index];
       
       // Criar tarefa no Kanban
       const task = {
           id: Date.now().toString(),
           title: `Aprovação: ${slot.title || 'Post Social Media'}`,
           type: 'social_media_approval',
           status: 'approval',
           client: planningData.clientId,
           description: slot.description,
           priority: 'medium',
           mediaData: {
               slotIndex: index,
               image: slot.image,
               planningTheme: planningData.theme
           }
       };

       // Adicionar ao localStorage do Kanban
       const existingTasks = JSON.parse(localStorage.getItem('integrare_tasks') || '[]');
       localStorage.setItem('integrare_tasks', JSON.stringify([...existingTasks, task]));

       // Atualizar status do slot
       const newSlots = [...planningData.slots];
       newSlots[index] = {
           ...newSlots[index],
           status: 'review'
       };
       setPlanningData({...planningData, slots: newSlots});
   };

   const exportPlanning = () => {
       const exportData = {
           ...planningData,
           exportDate: new Date().toISOString(),
           status: 'exported'
       };

       // Criar arquivo para download
       const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
       const url = window.URL.createObjectURL(blob);
       const a = document.createElement('a');
       a.href = url;
       a.download = `social-media-planning-${new Date().toISOString()}.json`;
       document.body.appendChild(a);
       a.click();
       document.body.removeChild(a);
       window.URL.revokeObjectURL(url);
   };

   return (
       <div className="social-media-container">
           <div className="social-media-header">
               <h2>Social Media Planner</h2>
               
               <div className="planning-info">
                   <div className="client-selector">
                       <div className="client-logo">
                           <img src="/logo-simbolo.png" alt="Logo Cliente" />
                       </div>
                       <select 
                           value={planningData.clientId}
                           onChange={(e) => setPlanningData({
                               ...planningData,
                               clientId: e.target.value
                           })}
                           className="client-select"
                       >
                           <option value="">Selecionar Cliente</option>
                           {/* Adicionar clientes dinamicamente */}
                       </select>
                   </div>
                   
                   <div className="planning-meta">
                       <input 
                           type="text"
                           placeholder="Tema do Planejamento"
                           value={planningData.theme}
                           onChange={(e) => setPlanningData({
                               ...planningData,
                               theme: e.target.value
                           })}
                           className="theme-input"
                       />
                       <input 
                           type="text"
                           placeholder="Objetivos"
                           value={planningData.objectives}
                           onChange={(e) => setPlanningData({
                               ...planningData,
                               objectives: e.target.value
                           })}
                           className="objectives-input"
                       />
                   </div>
               </div>

               <div className="planning-actions">
                   <button className="btn-export" onClick={exportPlanning}>
                       Exportar Planejamento
                   </button>
               </div>
           </div>

           <div className="slots-grid">
               {planningData.slots.map((slot, index) => (
                   <MediaSlot
                       key={index}
                       index={index}
                       data={slot}
                       onImageUpload={(file) => handleImageUpload(index, file)}
                       onUpdate={(data) => handleSlotUpdate(index, data)}
                       onSendToApproval={() => handleSendToApproval(index)}
                   />
               ))}
           </div>
       </div>
   );
};

export default SocialMedia;
