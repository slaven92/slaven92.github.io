<template>
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li v-for="(item,index) in $static.allBlogPost.edges"  :key="item.node.id" data-target="#carouselExampleIndicators" :data-slide-to="index" :class="{ 'active': index === 0 }"></li>
        </ol>
        <div class="carousel-inner" role="listbox">
            <!-- Slide One - Set the background image for this slide in the line below -->
            <div v-for="(item,index) in $static.allBlogPost.edges"  :key="item.node.id" class="carousel-item" :class="{ 'active': index === 0 }">
            <g-image alt="Example image" src="~/assets/images/books.jpg" class="d-block w-100" height="700"/>
            <div class="carousel-caption d-none d-md-block">
                <h3>{{ item.node.title }}   </h3>
                <p>This is a description for the first slide.</p>
            </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        </div>
</template>


<static-query>
query {
  allBlogPost(limit: 3){
    edges{
      node{
        id
        title
        path
      }
    }
  }
}
</static-query>