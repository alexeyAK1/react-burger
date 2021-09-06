import { DependencyList, useEffect, useState } from "react";

export const useForceMemoUpdate = (deps?: DependencyList | undefined) => {
    const [forceMemoUpdate, setForceMemoUpdate] = useState<string>(
        new Date().getTime().toString()
    );

    useEffect(() => {
        setForceMemoUpdate(new Date().getTime().toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return forceMemoUpdate;
}