namespace egret.sys{
    export class BatchNode extends RenderNode{
        private drawList:any[] = null;
        public image:BitmapData = null;
        /**
         * 控制在缩放时是否对位图进行平滑处理。
         */
        public smoothing: boolean = true;
        /**
         * 相对偏移矩阵。
         */
        public matrix: egret.Matrix;
        /**
         * 图片宽度。WebGL渲染使用
         */
        public imageWidth: number;
        /**
         * 图片高度。WebGL渲染使用
         */
        public imageHeight: number;
        /**
         * 使用的混合模式
         */
        public blendMode: number = null;
        /**
         * 相对透明度
         */
        public alpha: number = NaN;
        /**
         * 颜色变换滤镜
         */
        public filter: ColorMatrixFilter = null;
        /**
         * 翻转
         */
        public rotated: boolean = false;
        public constructor(bmd?:BitmapData) {
            super();
            this.type = RenderNodeType.BatchNode;
            if(bmd){
                this.setImage(bmd);
            }
        }

        public setImage(bmd:BitmapData): void{
            this.imageWidth = bmd.width;
            this.imageHeight = bmd.height;
            this.image = bmd;
        }

        /**
         * 添加一个绘制数据
         * @param sourceX 源图x起点
         * @param sourceY 源图y起点
         * @param sourceW 源图绘制区域宽度
         * @param sourceH 源图绘制区域高度
         * @param drawX 绘制目标x点
         * @param drawY 绘制目标y点
         * @param drawW 绘制目标宽度
         * @param drawH 绘制目标高度
         */
        public addData(sourceX: number, 
                       sourceY: number, 
                       sourceW: number, 
                       sourceH: number, 
                       drawX: number, 
                       drawY: number, 
                       drawW: number, 
                       drawH: number): void{
            if(!this.drawList){
                this.drawList = [];
            }
            this.drawList.push(sourceX, sourceY, sourceW, sourceH, drawX, drawY, drawW, drawH);
        }

        /**
         * 
         */
        public render(): void{
            if(!this.drawList){
                return;
            }
            let l = this.drawList.length / 8;
            for(let i = 0; i < l;i++){
                let start = i * 8;
                let sourceX = this.drawList[start],
                    sourceY = this.drawList[start + 1],
                    sourceW = this.drawList[start + 2],
                    sourceH = this.drawList[start + 3],
                    drawX = this.drawList[start + 4],
                    drawY = this.drawList[start + 5],
                    drawW = this.drawList[start + 6],
                    drawH = this.drawList[start + 7];
                this.drawData.push(sourceX, sourceY, sourceW, sourceH, drawX, drawY, drawW, drawH);
                this.renderCount++;
            }
        }
    }
}