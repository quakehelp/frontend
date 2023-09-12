 

import { useLottie } from 'lottie-react';
type AnimationProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    className?: string

}
const Animation = ({data,className}:AnimationProps) => {
    const options = {
        animationData: data,
        loop: true
      };
    
      const { View } = useLottie(options);
    
      return <div className={className}>{View}</div>;
}

export default Animation