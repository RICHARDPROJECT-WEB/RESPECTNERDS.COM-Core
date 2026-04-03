import { db } from './firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, getDoc } from 'firebase/firestore';

// 1. Subscribe to all topics (Real-time feed)
export function subscribeToTopics(callback) {
  const q = query(collection(db, 'topics'), orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snapshot) => {
    const topics = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(topics);
  });
}

// 2. Create a new topic
export async function createTopic(title, content, user) {
  if (!user) throw new Error("You must be logged in to post");
  
  return addDoc(collection(db, 'topics'), {
    title,
    content,
    authorId: user.uid,
    authorName: user.displayName || user.email.split('@')[0] || 'Anonymous Hacker',
    createdAt: serverTimestamp(),
  });
}

// 3. Get a single topic by ID
export async function getTopic(id) {
  const docRef = doc(db, 'topics', id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
}

// 4. Subscribe to replies for a specific topic
export function subscribeToReplies(topicId, callback) {
  const q = query(collection(db, `topics/${topicId}/replies`), orderBy('createdAt', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const replies = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(replies);
  });
}

// 5. Submit a new reply
export async function createReply(topicId, content, user) {
  if (!user) throw new Error("You must be logged in to reply");
  
  return addDoc(collection(db, `topics/${topicId}/replies`), {
    content,
    authorId: user.uid,
    authorName: user.displayName || user.email.split('@')[0],
    createdAt: serverTimestamp(),
  });
}
