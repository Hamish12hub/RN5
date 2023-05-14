export interface GestureEventType {
    nativeEvent: {
      state: number;translationX: number; translationY: number;
}
}

export interface Coordinate {
    x: number,
    y: number;
}

export enum Direction{
    Right,
    Up,
    Left,
    Down,
}