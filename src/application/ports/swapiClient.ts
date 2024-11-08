export interface SwapiClient {
  fetchCharacter(id: number): Promise<any>;
}
