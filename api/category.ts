import { AxiosInstance } from 'axios'

export default ($axios: AxiosInstance) => ({
  index(params: any, categoryTree?: string) {
    const queryString = Object.keys(params)
      .reduce(function (a: any[], k: string) {
        a.push(k + '=' + params[k].toString())
        return a
      }, [])
      .join('&')

    return $axios.get(
      '/api/category_trees/' + categoryTree + '/categories?' + queryString
    )
  },

  create(payload: object, params: { category_tree: number }) {
    return $axios.post(
      `/api/category_trees/${params.category_tree}/categories`,
      payload
    )
  },

  get(id: number, params: { category_tree: number }): Promise<object> {
    return $axios.get(
      `/api/category_trees/${params.category_tree}/categories/${id}`
    )
  },

  update(payload: object, id: number, params: { category_tree: number }) {
    return $axios.put(
      `/api/category_trees/${params.category_tree}/categories/${id}`,
      payload
    )
  },

  delete(id: number) {
    return $axios.delete(`/api/categories/${id}`)
  },
})
