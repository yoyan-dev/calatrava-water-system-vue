<!-- Best practice for architecture or design patter -->

1.  components

    - should only use for shared pages
    - Meaningful: not over specific, not overly abstract.
    - Short: 2 or 3 words.
    - Pronounceable: we want to be able talk about them.
    - PascalCase

      - better to be a dynamic component

      example:
      <!-- recommended -->

      <app-header></app-header>
      <user-list></user-list>
      <range-slider></range-slider>

      <!-- avoid -->

      <btn-group></btn-group> <!-- short, but unpronounceable. use `button-group` instead -->
      <ui-slider></ui-slider> <!-- all components are ui elements, so is meaningless -->
      <slider></slider> <!-- not custom element spec compliant -->

2.  \_components

    - should only use in used page

3.  Version control

    - always branch out for creating pages
    - work on single page only
    - always git pull
    - use git conventional naming
    - commit message should be meaningful

4.  Variable

    - same as component naming meaningful
    - camelCase
    - write self documenting code

5.  Format

    - script must be line 1
    - there should be hirearchy for composable or functions

6.  Styling

    - don't use fractional sizes example w-3/2 or w-[60%] (except 100%)
    - don't forget it to make responsive (TBD)
    - consistent spacing we'll be using 4,8,12,16 etc but for more use case it's okay to not follow
