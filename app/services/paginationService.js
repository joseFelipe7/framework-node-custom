class paginationService{
    validSort(sort, sortsValid) {
        if (!sort) {
          return true;
        }
        if (sort[0] == '-') {
          return sortsValid.includes(sort.substring(1));
        }
        return sortsValid.includes(sort);
    }
    validFilter(filter, filtersValid = []) {
        if (!filter) {
            return true;
        }
        filtersValid.push('search');
        for (const key in filter) {
            if (!filtersValid.includes(key)) {
                return false;
            }
        }
        return true;
    }
    static querySort(sort, aliasTable = '') {
        if (!sort) {
          return '';
        }
        if (sort[0] == '-') {
          return `ORDER BY ${aliasTable ? `${aliasTable}.` : ''}${sort.substring(1)} DESC`;
        }
        return `ORDER BY ${aliasTable ? `${aliasTable}.` : ''}${sort} ASC`;
    }
    static queryFilter(filter, searchItens, concat = '', aliasTable = '') {
      const filters = [];
      
      for (const search of searchItens) {
        filters.push(`${aliasTable ? `${aliasTable}.` : ''}${search} like '%${filter}%'`);
      }
      
      return filters.length > 0 ? ` ${concat} (${filters.join(' OR ')})` : '';
    }
    static transformMeta(page, perPage, total) {
        return {
          page: {
            current_page: parseInt(page),
            per_page: parseInt(perPage),
            from: page <= Math.ceil(total / perPage) ? ((page - 1) * perPage) + 1 : null,
            to: page * perPage < total ? page * perPage : (page <= Math.ceil(total / perPage) ? total : null),
            total: total,
            last_page: Math.ceil(total / perPage),
          },
        };
    }
    static itemStartPage(page, itemsPerPage) {
        return (page - 1) * itemsPerPage;
    }
}
module.exports = paginationService