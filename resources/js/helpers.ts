export function back() {
    if (!document.startViewTransition) {
        window.history.back();

        return;
    }

    document.startViewTransition(() => {
        window.history.back();
    });
}

export function stopPropagation(fn: (event: Event) => void) {
    return function (this: (event: Event) => void, event: Event) {
        event.stopPropagation();
        fn.call(this, event);
    };
}
