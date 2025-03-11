export const kozaQueries = {
    selectKozaList: "SELECT * FROM m_koza where (yuko_end_ymd = '00000000') or (yuko_end_ymd > to_char(current_date,'YYYYMMDD')) order by koza_id;",
    insertKoza: "INSERT INTO m_koza (koza_id, koza_cd, koza_name, koza_i_name, koza_short_name, koza_analytics_name, koza_domain, koza_description, yuko_start_ymd, yuko_end_ymd) "
              + "VALUES(nextval('koza_id_seq'), nextval('koza_cd_seq'), $1, $2, $3, $4, $5, $6, to_char(current_date,'YYYYMMDD'), '00000000' )  RETURNING *;",
    selectKozaExamYmList: "SELECT * FROM m_koza_exam_ym where koza_id = $1 order by exam_ym, exam_date;",
    deleteKozaExamYm: "DELETE FROM m_koza_exam_ym WHERE koza_id = $1 AND exam_ym = $2",
    updateKoza: "UPDATE m_koza SET koza_name = $2, koza_i_name = $3, koza_short_name = $4, koza_analytics_name = $5, koza_domain = $6, koza_description = $7 WHERE koza_id = $1 RETURNING *;"
};

/*
 "INSERT INTO m_koza "
                     + "("
                     + "koza_id,"
                     + "koza_cd,"
                     + "koza_name,"
                     + "koza_i_name,"
                     + "koza_short_name,"
                     + "koza_analytics_name,"
                     + "koza_domain,"
                     + "koza_description,"
                     + "yuko_start_ymd,"
                     + "yuko_end_ymd"
                     + ")"
                     + "VALUES"
                     + "("
                     + "nextval('koza_id_seq'),"
                     + "nextval('koza_cd_seq'),"
                     +  "$1,"
                     +  "$2,"
                     +  "$3,"
                     +  "$4,"
                     +  "$5,"
                     +  "$6,"
                     +  "to_char(current_date,'YYYYMMDD'),"
                     +  "'00000000'"
                     +  ") "
                     +  "RETURNING *";
*/