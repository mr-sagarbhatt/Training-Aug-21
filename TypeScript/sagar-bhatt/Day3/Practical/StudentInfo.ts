// * Generic Class
class StudentInfo<T, U> {
  private Id!: T;
  private Name!: U;
  setValue(id: T, name: U): void {
    this.Id = id;
    this.Name = name;
  }
  display(): void {
    console.log(`Id: ${this.Id}, Name: ${this.Name}`);
  }
}

export { StudentInfo };
