import React from 'react';
import styles from "./index.module.scss";

const Index = () => {
  return (
    <footer>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600'>
        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>Assistance</h5>
          <p className='hover:underline cursor-pointer'>Centre d'aide</p>
          <p className='hover:underline cursor-pointer'>AirCover</p>
          <p className='hover:underline cursor-pointer'>Soutenir les personnes en situation de handicap</p>
          <p className='hover:underline cursor-pointer'>Options d'annulation</p>
          <p className='hover:underline cursor-pointer'>Nos mesures face au Covid-19</p>
          <p className='hover:underline cursor-pointer'>Signaler un problème de voisinage</p>
        </div>
        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>Communauté</h5>
          <p className='hover:underline cursor-pointer'>Airbnb.org : réponse aux catastrophes</p>
          <p className='hover:underline cursor-pointer'>Lutte contre la discrimination</p>
        </div>
        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>Accueil de voyageurs</h5>
          <p className='hover:underline cursor-pointer'>Mettez votre logement sur Airbnb</p>
          <p className='hover:underline cursor-pointer'>AirCover pour les hôtes</p>
          <p className='hover:underline cursor-pointer'>Ressources pour les hôtes</p>
          <p className='hover:underline cursor-pointer'>Forum de la communauté</p>
          <p className='hover:underline cursor-pointer'>Accueillir de manière responsable</p>
        </div>
        <div className='space-y-4 text-xs text-gray-800'>
          <h5 className='font-bold'>Airbnb</h5>
          <p className='hover:underline cursor-pointer'>Newsroom</p>
          <p className='hover:underline cursor-pointer'>En savoir plus sur les nouveautés</p>
          <p className='hover:underline cursor-pointer'>Lettre de nos fondateurs</p>
          <p className='hover:underline cursor-pointer'>Carrières</p>
          <p className='hover:underline cursor-pointer'>Investisseurs</p>
          <p className='hover:underline cursor-pointer'>Cartes cadeaux</p>
        </div>
      </div>
    </footer>
  );
}

export default Index;