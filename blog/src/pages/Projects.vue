<template>
  <Layout>
    <div class="row m-5">
      <div class="col-md-4">
        <!-- Blog Post -->
        <div class="card mb-4">
          <g-link to="/submarine">
            <g-image
              class="card-img-top"
              src="~/assets/images/submarine.jpg"
              alt="Card image cap"
              height="750"
            />
          </g-link>
          <div class="card-body">
            <h2 class="card-title">Submarine game</h2>
            <p class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a
              laboriosam. Dicta expedita corporis animi vero voluptate
              voluptatibus possimus, veniam magni quis!
            </p>
            <g-link to="/blog/submarine" class="btn btn-primary"
              >Read More &rarr;</g-link
            >
          </div>
          <div class="card-footer text-muted">Posted on 2020</div>
        </div>
      </div>

      <div class="col-md-4">
        <!-- Blog Post -->
        <div class="card mb-4">
          <g-link to="/dragan">
            <g-image
              class="card-img-top"
              src="~/assets/images/milky-way.jpg"
              alt="Card image cap"
              height="1060"
            />
          </g-link>
          <div class="card-body">
            <h2 class="card-title">Simple quiz game</h2>
            <p class="card-text">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Reiciendis aliquid atque, nulla? Quos cum ex quis soluta, a
              laboriosam. Dicta expedita corporis animi vero voluptate
              voluptatibus possimus, veniam magni quis!
            </p>
            <g-link to="/blog/submarine" class="btn btn-primary"
              >Read More &rarr;</g-link
            >
          </div>
          <div class="card-footer text-muted">Posted on 2020</div>
        </div>
      </div>
    </div>
  </Layout>
</template>

