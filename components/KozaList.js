import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';
import styles from "../styles/Home.module.css"

function KozaList() {
  const [kozaList, setKozaList] = useState([]);

  useEffect(() => {
    const fetchKozaList = async () => {
      const { data, error } = await supabase
        .from('m_koza')
        .select('*')
        .order('koza_id', { ascending: true });

      if (error) {
        console.error('Error fetching koza list:', error);
      } else {
        setKozaList(data);
      }
    };

    fetchKozaList();
  }, []);

  return (
    <div className={styles.refBox}>
      <select name="koza">
        <option value="" selected>-選択してください-</option>
        {kozaList.map((koza) => (
          <option value={koza.koza_id}>{koza.koza_shortname}</option>
        ))}
      </select>
    </div>
  );
}

export default KozaList