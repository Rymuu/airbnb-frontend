import { useState } from "react";
import { TbGridDots } from 'react-icons/tb';
import { AiOutlineClose } from 'react-icons/ai';

const Index = ({ place }) => {

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-black min-w-full min-h-screen mt-28">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl text-white">Photos de {place.title}</h2>
                        <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-36 flex gap-1 py-2 px-4 rounded-xl bg-white items-center font-medium shadow shadow-black"><AiOutlineClose />Fermer les photos</button>
                    </div>
                    {place?.images?.length > 0 && place.images.map(image => (
                        <div>
                            <img src={image} alt={place.title} />
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="relative">
            <div className="h-[20%] grid gap-2 grid-cols-[2fr_1fr_1fr] rounded-2xl overflow-hidden">
                <div>
                    {place.images?.[0] && (
                        <div>
                            <img className="aspect-square object-cover" src={place.images[0]} />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.images?.[1] && (
                        <img className="aspect-square object-cover" src={place.images[1]} />
                    )}
                    <div className="overflow-hidden">
                        {place.images?.[2] && (
                            <img className="aspect-square object-cover relative top-2" src={place.images[2]} />
                        )}
                    </div>
                </div>
                <div className="grid">
                    {place.images?.[3] && (
                        <img className="aspect-square object-cover" src={place.images[3]} />
                    )}
                    <div className="overflow-hidden">
                        {place.images?.[4] && (
                            <img className="aspect-square object-cover relative top-2" src={place.images[4]} />
                        )}
                    </div>
                </div>
            </div>
            <button
                className="flex gap-2 absolute items-center bottom-6 right-6 py-2 px-4 bg-white rounded-xl border border-gray-600 shadow-md shadow-gray-500"
                onClick={() => setShowAllPhotos(true)}>
                <TbGridDots /> Afficher toutes les photos
            </button>
        </div>
    );
}
export default Index;