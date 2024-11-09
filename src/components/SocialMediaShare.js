// src/components/SocialMediaShare.js
import React, { useState } from 'react';
import '../styles/SocialMedia.css';

const SocialMediaShare = () => {
   // Estado para os 12 slots
   const [slots, setSlots] = useState(Array(12).fill({
       title: '',
       image: null,
       description: '',
       status: 'draft' // draft, review, approved
   }));

   // Função para upload de imagem
   const handleImageUpload = (index, e) => {
       const file = e.target.files[0];
       if (file) {
           const reader = new FileReader();
           reader.onload = (e) => {
               const newSlots = [...slots];
               newSlots[index] = {
                   ...newSlots[index],
                   image: e.target.result
               };
               setSlots(newSlots);
           };
           reader.readAsDataURL(file);
       }
   };

   return (
       <div className="social-media-container">
           <div className="social-media-header">
               <h2>Social Media Planner</h2>
               <div className="planning-info">
                   <input 
                       type="text" 
                       placeholder="Tema do Planejamento"
                       className="theme-input"
                   />
                   <input 
                       type="text" 
                       placeholder="Objetivos"
                       className="objectives-input"
                   />
               </div>
           </div>

           <div className="slots-grid">
               {slots.map((slot, index) => (
                   <div key={index} className="media-slot">
                       <div className="slot-number">#{index + 1}</div>
                       <div 
                           className="upload-area"
                           onClick={() => document.getElementById(`upload-${index}`).click()}
                       >
                           {slot.image ? (
                               <img src={slot.image} alt={`Post ${index + 1}`} />
                           ) : (
                               <div className="upload-placeholder">
                                   <img src="/tapa-buraco.svg" alt="Upload" />
                               </div>
                           )}
                           <input
                               type="file"
                               id={`upload-${index}`}
                               hidden
                               accept="image/*"
                               onChange={(e) => handleImageUpload(index, e)}
                           />
                       </div>
                       <div className="slot-content">
                           <input
                               type="text"
                               placeholder="Título do post"
                               value={slot.title}
                               onChange={(e) => {
                                   const newSlots = [...slots];
                                   newSlots[index] = {
                                       ...newSlots[index],
                                       title: e.target.value
                                   };
                                   setSlots(newSlots);
                               }}
                               className="title-input"
                           />
                           <textarea
                               placeholder="Descrição do post"
                               value={slot.description}
                               onChange={(e) => {
                                   const newSlots = [...slots];
                                   newSlots[index] = {
                                       ...newSlots[index],
                                       description: e.target.value
                                   };
                                   setSlots(newSlots);
                               }}
                               className="description-input"
                           />
                           <div className="slot-actions">
                               <button className="btn-save">Salvar</button>
                               <button className="btn-send">Enviar</button>
                           </div>
                       </div>
                   </div>
               ))}
           </div>
       </div>
   );
};

export default SocialMediaShare;
