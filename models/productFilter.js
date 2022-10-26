function filterBuilder(criterias) {
    let sql = '';
    let fieldArr = [];
  
    if (criterias.length === 0) return sql;
  
    for (var criteria of criterias) {
      fieldArr.push(criteria.value);
      sql = fieldArr.join(criteria.condition);
      fieldArr = [sql];
    }
    
    return ` WHERE ${sql}`;
  }
