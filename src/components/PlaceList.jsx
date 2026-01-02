import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function PlaceList() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "places"), orderBy("createdAt", "desc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlaces(data);
    });

    return () => unsub();
  }, []);

  return (
    <ul>
      {places.map((place) => (
        <li key={place.id}>
          <strong>{place.name}</strong> – {place.location}
          <br />
          <small>{place.note}</small>
        </li>
      ))}
    </ul>
  );
}
