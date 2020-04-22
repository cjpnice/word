<template>
  <div>
	  <form class="mui-input-group">
		<div class="mui-input-row">
			<label style="font-size:12px">按忘记次数筛选</label>
			<input type="text" placeholder="输入次数">
		</div>
		<div class="mui-button-row">
			<button type="button" class="mui-btn mui-btn-primary" onclick="return false;">确认</button>&nbsp;&nbsp;
			<button type="button" class="mui-btn mui-btn-danger" onclick="return false;">取消</button>
		</div>
	  </form>
      <div class="mui-card">
		        <ul class="mui-table-view">
                <li class="mui-table-view-divider">点击为忘记的单词，按点击数排序，右侧为点击次数</li>
		            <li class="mui-table-view-cell">disguise<span class="mui-badge mui-badge-primary">14</span></li>
		            <li class="mui-table-view-cell">stalk <span class="mui-badge mui-badge-success">1</span></li>
		            <li class="mui-table-view-cell">necessary <span class="mui-badge">5</span></li>   
		        </ul>
		    </div>
        
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>