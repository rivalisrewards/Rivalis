import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Settings({ userProfile }) {

  const [nickname, setNickname] = useState(userProfile?.nickname || "");
  const [saving, setSaving] = useState(false);

  const saveSettings = async () => {

    if (!auth.currentUser) return;

    setSaving(true);

    try {

      const ref = doc(db, "users", auth.currentUser.uid);

      await updateDoc(ref, {
        nickname
      });

    } catch (err) {
      console.error(err);
    }

    setSaving(false);

  };

  return (

    <div style={styles.container}>

      <h1>Settings</h1>

      <div style={styles.card}>

        <label>Nickname</label>

        <input
          value={nickname}
          onChange={(e)=>setNickname(e.target.value)}
          style={styles.input}
        />

        <button onClick={saveSettings} style={styles.button}>
          {saving ? "Saving..." : "Save"}
        </button>

      </div>

    </div>

  );

}

const styles = {

  container:{
    padding:"30px",
    maxWidth:"600px",
    margin:"auto",
    color:"#fff"
  },

  card:{
    background:"#111",
    padding:"20px",
    borderRadius:"10px",
    display:"flex",
    flexDirection:"column",
    gap:"12px"
  },

  input:{
    padding:"10px",
    borderRadius:"6px",
    border:"none"
  },

  button:{
    background:"#ff3050",
    border:"none",
    padding:"10px",
    color:"#fff",
    borderRadius:"6px",
    cursor:"pointer"
  }

};
