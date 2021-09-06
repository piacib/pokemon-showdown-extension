import { useRef } from 'react';
// logs number of renders 
export const useCountRenders = (text ='') => {
    const renders = useRef(0);
    console.log(`${text} renders `, renders.current++)
}
