const has = Object.prototype.hasOwnProperty;

export const isEmpty = (prop) => {
  return (
    prop === null ||
    prop === undefined ||
    (has.call(prop, 'length') && prop.length === 0) ||
    (prop.constructor === Object && Object.keys(prop).length === 0)
  );
};

export const getRouterParams = (path, params) => {
  if(!isEmpty(params)) {
    Object.keys(params).forEach(key => {
      path = path.replace(`:${key}`, params[key])
    })
  }

  return path
}

export const convertQueryToString = (routerPath, query) => {
  if (typeof query === 'object' && !isEmpty(query)) {
    const querys = [];
    Object.keys(query).forEach(key => {
      querys.push(`${key}=${query[key]}`)
    });
    return `${routerPath}?${querys.join('&')}`
  }
  if (typeof query === 'string') {
    return `${routerPath}${query}`
  }
  return routerPath
};