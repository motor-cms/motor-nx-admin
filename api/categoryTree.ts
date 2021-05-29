import { AxiosInstance } from 'axios'

export default ($axios: AxiosInstance) => ({
  index(params: any) {
    const queryString = Object.keys(params)
      .reduce(function (a: any[], k: string) {
        a.push(k + '=' + params[k].toString())
        return a
      }, [])
      .join('&')

    return $axios.get('/api/category_trees?' + queryString)
  },

  create(payload: object) {
    return $axios.post(`/api/category_trees`, payload)
  },

  get(id: number | string): Promise<object> {
    return $axios.get(`/api/category_trees/${id}`)
  },

  update(payload: object, id: number) {
    return $axios.put(`/api/category_trees/${id}`, payload)
  },

  delete(id: number) {
    return $axios.delete(`/api/category_trees/${id}`)
  },
})
