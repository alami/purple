import {IUser, IUserCourses, PurchaseState, UserRole} from "@purple/interfaces";
import {compare, genSalt, hash} from "bcryptjs";

export class UserEntity implements IUser {
  _id: string;
  displayName: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  courses?: IUserCourses[];

  constructor(user: IUser) {
    this._id = user._id;
    this.passwordHash = user.passwordHash;
    this.displayName = user.displayName;
    this.email = user.email;
    this.role = user.role;
    this.courses = user.courses;
  }

  public addCourse (courseId: string) {
    const exist = this.courses.find(c => c._id === courseId)
    if (exist) {
      throw new Error('Добавляемый курс уже существует')
    }
    this.courses.push({
      courseId,
      purchaseState: PurchaseState.Started,
    })
  }

  public deleteCourse (courseId: string) {
    this.courses = this.courses.filter(c => c._id !== courseId)
  }

  public updateCourse (courseId: string, status: PurchaseState) {
    this.courses = this.courses.map(c => {
      if (c._id === courseId) {
        c.purchaseState = status
        return c
      }
      return c
    })
  }

  public getPublicProfile () {
    return {
     email: this.email,
     role: this.role,
     displayName: this.displayName,
    }
  }

  public async setPassword(password: string) {
    const salt = await genSalt(10);
    this.passwordHash = await hash(password, salt);
    return this;
  }
  public async validatePassword(password: string) {
    return compare(password, this.passwordHash);
  }

  public updateCourseStatus(courseId: string, state: PurchaseState) {
    const exist = this.courses.find(c => c.courseId === courseId);
    if (!exist) {
      this.courses.push({
        courseId,
        purchaseState: state
      });
      return this;
    }
    /*if (state === PurchaseState.Cenceled) {
      this.courses = this.courses.filter(c => c.courseId !== courseId);
      return this;
    }
    this.courses = this.courses.map(c => {
      if (c.courseId === courseId) {
        c.purchaseState = state;
        return c;
      }
      return c;
    });
    this.events.push({
      topic: AccountChangedCourse.topic,
      data: { courseId, userId: this._id, state }
    });
    return this;*/
  }

  public getCourseState(courseId: string): PurchaseState {
    return this.courses.find(c => c.courseId === courseId)?.purchaseState ?? PurchaseState.Started;
  }
}
