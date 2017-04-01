<svg version='1.1' x='0px' y='0px' width='307px' height='283px' class="clicked" id='rocket'>

    <circle class='icon-circle' cx='147.5' cy='138.6' r='105.5' />
    
    <g class='rocket-inner'>
      <path class='fire' id='fire-middle' d='M148.891,179.906c3.928,0,7.111,3.176,7.111,7.094 c0,7.78-7.111,16-7.111,16s-7.111-8.349-7.111-16C141.78,183.082,144.963,179.906,148.891,179.906z'/>
      
      <path class='fire' id='fire-right' d='M154.063,181.092c3.577-1.624,7.788-0.048,9.408,3.52 c3.216,7.084,0.139,17.508,0.139,17.508s-9.927-4.662-13.09-11.63C148.9,186.923,150.487,182.715,154.063,181.092z'/>
      
      <path class='fire' id='fire-left' d='M143.392,182.519c3.25,2.207,4.098,6.623,1.896,9.864 c-4.372,6.436-14.873,9.238-14.873,9.238s-1.191-10.902,3.108-
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    25% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@-webkit-keyframes fillOpacity2 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    25% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@-moz-keyframes fillOpacity2 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    25% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@keyframes fillOpacity3 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    67% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@-webkit-keyframes fillOpacity3 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    67% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@-moz-keyframes fillOpacity3 { 
    0% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    67% {
        fill-opacity: 1;
        stroke-opacity: 1;
    }
    100% {
        fill-opacity: 0;
        stroke-opacity: 0;
    }
}
@keyframes rocektMove { 
    0% { transform: translateY(0px) }
    100% { transform: translateY(20px) }
}
@-webkit-keyframes rocektMove { 
    0% { -webkit-transform: translateY(0px) }
    100% { -webkit-transform: translateY(20px) }
}
@-moz-keyframes rocektMove { 
    0% { -moz-transform: translateY(0px) }
    100% { -moz-transform: translateY(20px) }
}
/*=============================================
[ Animation Classes ]
==============================================*/
.fire {
    -webkit-animation-timing-function: ease-in;
    -moz-animation-timing-function: ease-in;
    -ms-animation-timing-function: ease-in;
    -o-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    /*animation-iteration-count*/
    -webkit-animation-iteration-count: infinite;
    -moz-animation-iteration-count: infinite;
    -ms-animation-iteration-count: infinite;
    -o-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    /*transform-origin*/
    -webkit-transform-origin: 50% 50%;
    -moz-transform-origin: 50% 50%;
    -ms-transform-origin: 50% 50%;
    -o-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
    /*animation-direction*/
    -webkit-animation-direction: normal;
    -moz-animation-direction: normal;
    -ms-animation-direction: normal;
    -o-animation-direction: normal;
    animation-direction: normal;
}
#rocket.clicked  #fire-left {
    /*animation-delay*/
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    -ms-animation-delay: 0s;
    -o-animation-delay: 0s;
    animation-delay: 0s;
    /*animation-name*/
    -webkit-animation-name: fireLeft, fillOpacity1;
    -moz-animation-name: fireLeft, fillOpacity1;
    -ms-animation-name: fireLeft, fillOpacity1;
    -o-animation-name: fireLeft, fillOpacity1;
    animation-name: fireLeft, fillOpacity1;
    /*animation-duration*/
    -webkit-animation-duration: 1.2s;
    -moz-animation-duration: 1.2s;
    -ms-animation-duration: 1.2s;
    -o-animation-duration: 1.2s;
    animation-duration: 1.2s;
}
#rocket.clicked #fire-middle {
    /*animation-delay*/
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    -ms-animation-delay: 0s;
    -o-animation-delay: 0s;
    animation-delay: 0s;
    /*animation-name*/
    -webkit-animation-name: fireMiddle, fillOpacity1;
    -moz-animation-name: fireMiddle, fillOpacity1;
    -ms-animation-name: fireMiddle, fillOpacity1;
    -o-animation-name: fireMiddle, fillOpacity1;
    animation-name: fireMiddle, fillOpacity1;
    /*animation-duration*/
    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    -ms-animation-duration: 1s;
    -o-animation-duration: 1s;
    animation-duration: 1s;
}

#rocket.clicked #fire-right {
    /*animation-delay*/
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    -ms-animation-delay: 0s;
    -o-animation-delay: 0s;
    animation-delay: 0s;
    /*animation-name*/
    -webkit-animation-name: fireRight, fillOpacity1;
    -moz-animation-name: fireRight, fillOpacity1;
    -ms-animation-name: fireRight, fillOpacity1;
    -o-animation-name: fireRight, fillOpacity1;
    animation-name: fireRight, fillOpacity1;
    /*animation-duration*/
    -webkit-animation-duration: 1.3s;
    -moz-animation-duration: 1.3s;
    -ms-animation-duration: 1.3s;
    -o-animation-duration: 1.3s;
    animation-duration: 1.3s;
}

#rocket.clicked #fire-small-left {
    /*animation-delay*/
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    -ms-animation-delay: 0s;
    -o-animation-delay: 0s;
    animation-delay: 0s;
    /*animation-name*/
    -webkit-animation-name: fireSmall, fillOpacity2;
    -moz-animation-name: fireSmall, fillOpacity2;
    -ms-animation-name: fireSmall, fillOpacity2;
    -o-animation-name: fireSmall, fillOpacity2;
    animation-name: fireSmall, fillOpacity2;
    /*animation-duration*/
    -webkit-animation-duration: 1.3s;
    -moz-animation-duration: 1.3s;
    -ms-animation-duration: 1.3s;
    -o-animation-duration: 1.3s;
    animation-duration: 1.3s;
    /*transform-origin*/
    -webkit-transform-origin: bottom;
    -moz-transform-origin: bottom;
    -ms-transform-origin: bottom;
    -o-transform-origin: bottom;
    transform-origin: bottom;
}

#rocket.clicked #fire-small-right{
    /*animation-delay*/
    -webkit-animation-delay: 0.3s;
    -moz-animation-delay: 0.3s;
    -ms-animation-delay: 0.3s;
    -o-animation-delay: 0.3s;
    animation-delay: 0.3s;
    /*animation-name*/
    -webkit-animation-name: fireSmall, fillOpacity3;
    -moz-animation-name: fireSmall, fillOpacity3;
    -ms-animation-name: fireSmall, fillOpacity3;
    -o-animation-name: fireSmall, fillOpacity3;
    animation-name: fireSmall, fillOpacity3;
    /*animation-duration*/
    -webkit-animation-duration: 1.6s;
    -moz-animation-duration: 1.6s;
    -ms-animation-duration: 1.6s;
    -o-animation-duration: 1.6s;
    animation-duration: 1.6s;
    /*transform-origin*/
    -webkit-transform-origin: bottom;
    -moz-transform-origin: bottom;
    -ms-transform-orig17.23C135.725,181.149,140.143,180.312,143.392,182.519z'/>
      
      <path class='fire' id='fire-small-left' d='M143.193 187.531c2.226 0.4 3.7 2.6 3.2 4.8 c-0.875 4.407-5.829 8.264-5.829 8.264s-3.09-5.53-2.229-9.865C138.807 188.5 141 187.1 143.2 187.531z'/>
      
      <path class='fire' id='fire-small-right' d='M152.089 188.599c2.043-0.985 4.496-0.132 5.5 1.9 c1.952 4 0.3 10.1 0.3 10.107s-5.795-2.56-7.713-6.541C149.186 192 150 189.6 152.1 188.599z'/>
      
      <path class='rocket-bottom' d='M157.069 171.31h-3.292c-1.562-0.048-3.178-0.076-4.846-0.076 s-3.284 0.028-4.846 0.076h-3.292c-7.277-7.938-12.371-26.182-12.371-47.434c0-28.54 9.182-51.676 20.508-51.676 c11.327 0 20.5 23.1 20.5 51.676C169.44 145.1 164.3 163.4 157.1 171.31z'/>
      
      <path class='wing-base' d='M166.678 127.161c0 0 17.7 3.3 12.9 48.099l-18.06-14.05 L166.678 127.161z'/>
      
      <path class='wing-shadow' d='M158.225 140.336c10.481-5.584 22.7 22.2 21.4 34.9 l-18.06-14.05C161.542 161.2 156.1 144.3 158.2 140.336z'/>
      
      <path class='wing-base' d='M135.131 161.21l-18.06 14.1 c-4.805-44.793 12.924-48.099 12.924-48.099L135.131 161.21z'/>
      
      <path class='wing-shadow' d='M135.131 161.21l-18.06 14.1 c-1.367-12.746 10.896-40.509 21.377-34.924C140.614 144.3 135.1 161.2 135.1 161.21z'/>
      
      <path class='rocket-base' d='M162.728 167.358c-3.778-0.623-8.573-0.996-13.796-0.996 s-10.018 0.373-13.795 0.996c-5.033-10.186-8.257-25.808-8.257-43.338c0-30.688 9.873-55.566 22.052-55.566 s22.053 24.9 22.1 55.566C170.984 141.6 167.8 157.2 162.7 167.358z'/>
      
      <path class='rocket-shadow' d='M145.464 166.417c19.578-40.575 7.26-85.229 4.112-98.067 c11.88 0.9 21.4 25.4 21.4 55.525c0 17.529-3.225 33.152-8.257 43.337c0 0-3.786-0.472-8.069-0.697 S145.464 166.4 145.5 166.417z'/>
      
      <circle class='window' cx='148.9' cy='111.3' r='10.5'/>
      
      <circle class='window' cx='148.9' cy='132.4' r='5.2'/>
  </g>

</svg>