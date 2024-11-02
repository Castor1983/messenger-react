import { collection, onSnapshot } from "firebase/firestore";
import {useEffect, useState } from "react";
import { firestore } from "../firebase";
import { IMessageResponse } from "../types/messageType";

const useFirestoreCollection = (collectionName: string) => {
    const [data, setData] = useState<IMessageResponse[]>([]);

    useEffect(() => {
        if (!collectionName) return;
        const colRef = collection(firestore, collectionName);



        const unsubscribe = onSnapshot(colRef, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                senderId: doc.data().senderId,
                receiverId: doc.data().receiverId,
                message: doc.data().message,
                create: doc.data().create,
                files: doc.data().files || []
            }));

            setData(docs);
        });


        return () => unsubscribe();
    }, [collectionName]);
    const sortedMessages = [...data].sort((a, b) => {
        const dateA = new Date(a.create.seconds * 1000 + a.create.nanoseconds / 1e6);
        const dateB = new Date(b.create.seconds * 1000 + b.create.nanoseconds / 1e6);
        return dateA.getTime() - dateB.getTime();   });
    return sortedMessages;
};

export {useFirestoreCollection};
