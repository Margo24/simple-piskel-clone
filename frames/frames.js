export default class Frames {
    constructor() {
        this.mainCanvas = document.getElementById('canvas');
        this.context = this.mainCanvas.getContext('2d');
    }

    init() {
        this.trackNewFrame();
        this.trackMenuFrame();
        this.changeActiveFrame();
        this.animation();
    }

    createFrame() {
        const frameList = document.querySelector('.frames__list');
        const li = document.createElement('li');
        li.classList.add('frame__item', 'frame--active');

        const newCanvas = document.createElement('canvas');
        newCanvas.width = 150;
        newCanvas.height = 150;
        li.appendChild(newCanvas);
        li.appendChild(this.createCornerDivs());
        frameList.appendChild(li);

        return li;
    }

    createCornerDivs() {
        const imgPathes = ['', 'frames/frame-icons/delete.svg',
            'frames/frame-icons/duplicate.svg',
            'frames/frame-icons/move.svg'];
        const classesArray = ['frame__number', 'frame__delete',
            'frame__duplicate', 'frame__move'];
        const fragment = document.createDocumentFragment();

        for (let i = 0; i <= 3; i++){
            const cornerDiv = document.createElement('div');
            cornerDiv.classList.add('button', classesArray[i]);
            if (i) {
                const image = document.createElement("img");
                image.src = imgPathes[i];
                image.width = 25;
                cornerDiv.appendChild(image);
            }
            fragment.appendChild(cornerDiv);
        }

        return fragment;
    }

    renumberFrames() {
        const frameNumber = document.getElementsByClassName('frame__number');
        Array.prototype.forEach.call(frameNumber, (element, index) => {
            element.innerText = `${index + 1}`;
        });
    }

    trackNewFrame() {
        const newFrameButton = document.querySelector('.frames__pointer');
        newFrameButton.addEventListener('click', () => {
            const currentActiveFrame = document.querySelector('.frame--active');
            currentActiveFrame.classList.remove('frame--active');

            const frame = this.createFrame();
            this.trackMenuFrame(frame);
            this.renumberFrames();

            this.context.clearRect(0, 0, 512, 512);
        });
    }

    setFrame() {
        const activeFrame = document.querySelector('.frame--active').children[0];

        this.context.clearRect(0, 0, 512, 512);
        this.context.imageSmoothingEnabled = false;

        this.context.drawImage(activeFrame, 0, 0, 150, 150, 0, 0, 512, 512);
    }

    getFrame() {
        const activeFrame = document.querySelector('.frame--active').children[0];
        const ctx = activeFrame.getContext('2d');

        const image = this.mainCanvas;
        this.context.imageSmoothingEnabled = false;

        ctx.clearRect(0, 0, 150, 150);
        ctx.drawImage(image, 0, 0, 512, 512, 0, 0, 150, 150);
    }

    deleteFrame(event) {
        const frameButton = event.target.closest('.frame__delete');
        const frame = frameButton.parentNode;
        const frameList = document.querySelector('.frames__list');

        if (frameList.children.length > 1) {
            frameList.removeChild(frame);
            this.renumberFrames();
        }

        if (frame.classList.contains('frame--active')) {
            frameList.lastElementChild.classList.add('frame--active');
        }

        this.setFrame();
    }

    trackMenuFrame(frame = document) {
        const buttonDelete = frame.querySelector('.frame__delete');
        buttonDelete.addEventListener('click', this.deleteFrame.bind(this));
    }

    changeActiveFrame() {
        const frameList = document.querySelector('.frames__list');
        frameList.addEventListener('click', this.changeActiveFrameFunction.bind(this));
    }

    changeActiveFrameFunction(event) {
        let target = event.target;

        if (target.tagName != 'CANVAS') return;
        const activeFrame = document.querySelector('.frame--active');
        activeFrame.classList.toggle('frame--active');

        target.parentNode.classList.add('frame--active');
        this.setFrame();
    }

    animation() {
        const animation = document.getElementById('animation');
        const animationCtx = animation.getContext('2d');
        let count = 0;

        const animate =() => {
            const frames = document.getElementsByClassName('frame__item');
            const picture = frames[count % frames.length].children[0];
            animationCtx.clearRect(0, 0, 150, 150);
            animationCtx.drawImage(picture, 0, 0, 150, 150, 0, 0, 150, 150);
            count ++;
        }

        const timer = setInterval(() => animate(), 500);
    }
}
