export interface UserRepositoryInterface {
  store(usersData: any[]): Promise<any>
}
