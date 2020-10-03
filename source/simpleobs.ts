export type Observer<A, B> = (value: A) => B;

export type Observable<A> = <B>(observer: Observer<A, B>) => Observable<B>;

export class ObservableClass<A> {
	private state: A;
	private observers: Array<Observer<A, any>>;

	constructor(state: A) {
		this.state = state;
		this.observers = new Array<Observer<A, any>>();
	}

	addObserver<B>(observer: Observer<A, B>): Observable<B> {
		let observable = new ObservableClass<B>(observer(this.state));
		this.observers.push((state) => {
			observable.updateState(observer(state));
		});
		return observable.addObserver.bind(observable);
	}

	getState(): A {
		return this.state;
	}

	updateState(state: A): void {
		if (state === this.state) {
			return;
		}
		this.state = state;
		for (let observer of this.observers) {
			observer(this.state);
		}
	}
}

export interface ArrayObserver<A> {
	onappend?(state: A): void,
	onsplice?(index: number): void,
	onupdate?(state: Array<A>): void
}

export class ArrayObservable<A> {
	private state: Array<A>;
	private observers: Array<ArrayObserver<A>>;

	constructor(state: Array<A>) {
		this.state = state;
		this.observers = new Array<ArrayObserver<A>>();
	}

	addObserver(observer: ArrayObserver<A>): void {
		this.observers.push(observer);
		observer.onupdate?.(this.state);
	}

	compute<B>(observer: Observer<Array<A>, B>): Observable<B> {
		let observable = new ObservableClass<B>(observer(this.state));
		this.observers.push({
			onupdate(state) {
				observable.updateState(observer(state));
			}
		});
		return observable.addObserver.bind(observable);
	}

	getState(): Array<A> {
		return this.state;
	}

	append(state: A): void {
		this.state.push(state);
		for (let observer of this.observers) {
			observer.onappend?.(state);
			observer.onupdate?.(this.state);
		}
	}

	splice(index: number): void {
		if (index < 0 || index >= this.state.length) {
			throw `Expected an index of at most ${this.state.length}, got ${index}!`;
		}
		this.state.splice(index, 1);
		for (let observer of this.observers) {
			observer.onsplice?.(index);
			observer.onupdate?.(this.state);
		}
	}

	update(state: A[]): void {
		for (let i = this.state.length; i >= 0; i--) {
			this.splice(i);
		}
		for (let v of state) {
			this.append(v);
		}
	}
}