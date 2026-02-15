const { db } = require('../../firebase_server');
const { Timestamp } = require('firebase-admin/firestore');

export const chatStorage = {
  async getConversation(id) {
    const doc = await db.collection('conversations').doc(String(id)).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  },
  async getAllConversations() {
    const snapshot = await db.collection('conversations').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async createConversation(title) {
    const res = await db.collection('conversations').add({
      title,
      createdAt: Timestamp.now()
    });
    return { id: res.id, title };
  },
  async deleteConversation(id) {
    await db.collection('conversations').doc(String(id)).delete();
  },
  async getMessagesByConversation(conversationId) {
    const snapshot = await db.collection('messages')
      .where('conversationId', '==', String(conversationId))
      .orderBy('createdAt', 'asc')
      .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  },
  async createMessage(conversationId, role, content) {
    const res = await db.collection('messages').add({
      conversationId: String(conversationId),
      role,
      content,
      createdAt: Timestamp.now()
    });
    return { id: res.id, role, content };
  }
};
