// src/components/SocialMedia/MediaSlot.js
import React, { useRef } from 'react';

const MediaSlot = ({ index, data, onImageUpload, onUpdate, onSendToApproval }) => {
   const fileInputRef = useRef(null);

   const handleImageClick = () => {
       fileInputRef.current.click();
   };

   const handleFileChange = (e) => {
       const file = e.target.files[0];
       if (file) {
           if (file.type.startsWith('image/')) {
               onImageUpload(file);
           } else {
               alert('Por favor, selecione apenas arquivos de imagem.');
           }
       }
   };

   const getStatusColor = () => {
       switch(data.status) {
           case 'review': return 'var(--accent)';
           case 'approved': return 'var(--neon)';
           default: return 'var(--secondary)';
       }
   };

   return (
       <div className="media-slot">
           <div className="slot-header">
               <span className="slot-number">#{index + 1}</span>
               <div 
                   className="status-indicator"
                   style={{ backgroundColor: getStatusColor() }}
               >
                   {data.status === 'draft' ? 'Rascunho' : 
                    data.status === 'review' ? 'Em Aprovação' : 'Aprovado'}
               </div>
           </div>

           <div 
               className={`upload-area ${data.image ? 'has-image' : ''}`}
               onClick={handleImageClick}
           >
               {data.image ? (
                   <img src={data.image} alt={`Post ${index + 1}`} className="uploaded-image" />
               ) : (
                   <div className="upload-placeholder">
                       <img src="/tapa-buraco.svg" alt="Upload" className="placeholder-image" />
                       <span className="upload-text">Clique para upload (1350x1080)</span>
                   </div>
               )}
               <input
                   type="file"
                   ref={fileInputRef}
                   onChange={handleFileChange}
                   accept="image/*"
                   className="file-input"
                   hidden
               />
               <div className="image-overlay">
                   <span>Trocar imagem</span>
               </div>
           </div>

           <div className="slot-content">
               <div className="input-group">
                   <input
                       type="text"
                       placeholder="Título do post"
                       value={data.title}
                       onChange={(e) => onUpdate({ title: e.target.value })}
                       className="title-input"
                   />
               </div>

               <div className="input-group">
                   <textarea
                       placeholder="Redação do post"
                       value={data.description}
                       onChange={(e) => onUpdate({ description: e.target.value })}
                       className="description-input"
                       rows="4"
                   />
               </div>

               <div className="slot-actions">
                   <button 
                       className="btn-save"
                       onClick={() => onUpdate({ status: 'draft' })}
                       disabled={data.status === 'review'}
                   >
                       Salvar
                   </button>
                   <button 
                       className="btn-approval"
                       onClick={onSendToApproval}
                       disabled={!data.image || !data.title || data.status === 'review'}
                   >
                       Enviar para Aprovação
                   </button>
               </div>
           </div>
       </div>
   );
};

export default MediaSlot;

// src/components/SocialMedia/SocialMedia.css
.social-media-container {
   background: var(--primary-bg);
   min-height: 100vh;
   padding: 2rem;
}

.social-media-header {
   margin-bottom: 2rem;
}

.social-media-header h2 {
   color: var(--neon);
   margin-bottom: 1rem;
   font-family: 'Poppins', sans-serif;
}

.planning-info {
   display: flex;
   flex-direction: column;
   gap: 1rem;
   background: rgba(255, 255, 255, 0.05);
   padding: 1.5rem;
   border-radius: 12px;
   border: 1px solid rgba(0, 225, 255, 0.1);
}

.client-selector {
   display: flex;
   align-items: center;
   gap: 1rem;
}

.client-logo {
   width: 48px;
   height: 48px;
   background: var(--primary-bg);
   border-radius: 8px;
   display: flex;
   align-items: center;
   justify-content: center;
   overflow: hidden;
}

.client-logo img {
   width: 100%;
   height: 100%;
   object-fit: contain;
}

.client-select {
   flex: 1;
   padding: 0.75rem;
   background: rgba(255, 255, 255, 0.05);
   border: 1px solid rgba(0, 225, 255, 0.1);
   border-radius: 8px;
   color: var(--primary-text);
}

.planning-meta {
   display: grid;
   grid-template-columns: 1fr 1fr;
   gap: 1rem;
}

.theme-input,
.objectives-input {
   padding: 0.75rem;
   background: rgba(255, 255, 255, 0.05);
   border: 1px solid rgba(0, 225, 255, 0.1);
   border-radius: 8px;
   color: var(--primary-text);
}

.slots-grid {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
   gap: 2rem;
   margin-top: 2rem;
}

.media-slot {
   background: rgba(255, 255, 255, 0.05);
   border-radius: 12px;
   overflow: hidden;
   border: 1px solid rgba(0, 225, 255, 0.1);
   transition: all 0.3s ease;
}

.media-slot:hover {
   border-color: var(--neon);
   box-shadow: var(--neon-glow);
}

.slot-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 1rem;
   background: rgba(0, 0, 0, 0.2);
}

.slot-number {
   color: var(--neon);
   font-weight: 500;
}

.status-indicator {
   padding: 0.25rem 0.75rem;
   border-radius: 12px;
   font-size: 0.75rem;
   color: var(--primary-bg);
}

.upload-area {
   aspect-ratio: 1350/1080;
   position: relative;
   cursor: pointer;
   overflow: hidden;
}

.uploaded-image {
   width: 100%;
   height: 100%;
   object-fit: cover;
}

.upload-placeholder {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   text-align: center;
}

.placeholder-image {
   width: 64px;
   height: 64px;
   margin-bottom: 1rem;
   opacity: 0.5;
}

.image-overlay {
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   align-items: center;
   justify-content: center;
   opacity: 0;
   transition: opacity 0.3s ease;
}

.upload-area:hover .image-overlay {
   opacity: 1;
}

.slot-content {
   padding: 1rem;
}

.input-group {
   margin-bottom: 1rem;
}

.title-input,
.description-input {
   width: 100%;
   background: rgba(255, 255, 255, 0.05);
   border: 1px solid rgba(0, 225, 255, 0.1);
   color: var(--primary-text);
   padding: 0.75rem;
   border-radius: 8px;
}

.description-input {
   resize: vertical;
}

.slot-actions {
   display: flex;
   gap: 1rem;
}

.btn-save,
.btn-approval {
   flex: 1;
   padding: 0.75rem;
   border: none;
   border-radius: 8px;
   cursor: pointer;
   transition: all 0.3s ease;
}

.btn-save {
   background: var(--secondary);
   color: var(--primary-text);
}

.btn-approval {
   background: var(--neon);
   color: var(--primary-bg);
}

.btn-save:hover,
.btn-approval:hover {
   transform: translateY(-2px);
}

.btn-approval:hover {
   box-shadow: var(--neon-glow);
}

.btn-save:disabled,
.btn-approval:disabled {
   opacity: 0.5;
   cursor: not-allowed;
   transform: none;
}

@media (max-width: 768px) {
   .planning-meta {
       grid-template-columns: 1fr;
   }

   .slots-grid {
       grid-template-columns: 1fr;
   }
}
