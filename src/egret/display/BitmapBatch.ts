namespace egret {
    export class BitmapBatch extends DisplayObject{
        constructor(bmd?: BitmapData){
            super();
            this.$renderNode = new sys.BatchNode(bmd);
        }

        /**
         * @private
         * 显示对象添加到舞台
         */
        $onAddToStage(stage: Stage, nestLevel: number): void {
            super.$onAddToStage(stage, nestLevel);

            let bitmapData = (<sys.BatchNode>this.$renderNode).image;
            if (bitmapData) {
                BitmapData.$addDisplayObject(this, bitmapData);
            }
        }

        /**
         * @private
         * 显示对象从舞台移除
         */
        $onRemoveFromStage(): void {
            super.$onRemoveFromStage();

            let bitmapData = (<sys.BatchNode>this.$renderNode).image;
            if (bitmapData) {
                BitmapData.$removeDisplayObject(this, bitmapData);
            }
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
            (<sys.BatchNode>this.$renderNode).addData(sourceX, sourceY, sourceW, sourceH, drawX, drawY, drawW, drawH);
        }

        /**
         * @private
         */
        $render(): void {
            (<sys.BatchNode>this.$renderNode).render();
        }

        /**
         * 设置位图，batch node 只能使用同一张纹理
         */
        public setImage(bmd:BitmapData): void{
            (<sys.BatchNode>this.$renderNode).setImage(bmd);
        }
    }
}