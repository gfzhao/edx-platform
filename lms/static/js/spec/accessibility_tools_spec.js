describe("Tests for accessibility_tools.js", function() {

  describe("Tests for accessible modals", function() {
      var pressTabOnLastElt = function (firstElt, lastElt) {
        firstElt.focus();
      };

      var pressShiftTabOnFirstElt = function (firstElt, lastElt) {
        lastElt.focus();
      };

      var pressEsc = function (closeModal) {
        closeModal.click();
      };

    beforeEach(function(){
      var focusedElementBeforeModal;
      loadFixtures('js/fixtures/dashboard-fixture.html');
      accessible_modal("#trigger", "#close-modal", "#modalId", "#mainPageId");
      $("#trigger").click();
    });

    it("sets focusedElementBeforeModal to trigger", function() {
      expect(focusedElementBeforeModal).toHaveAttr("id", "trigger");
    });

    it("sets main page aria-hidden attr to true", function() {
      expect($("#mainPageId")).toHaveAttr("aria-hidden", "true");
    });

    it("sets modal aria-hidden attr to false", function() {
      expect($("#modalId")).toHaveAttr("aria-hidden", "false");
    });

    it("sets the close-modal button's tab index to 1", function() {
      expect($("#close-modal")).toHaveAttr("tabindex", "1");
    });

    it("sets the focussable elements' tab indices to 2", function() {
      expect($("#text-input")).toHaveAttr("tabindex", "2");
      expect($("#submit")).toHaveAttr("tabindex", "2");
    });

    it("shifts focus to close-modal button", function() {
      expect($("#close-modal")).toBeFocused();
    });

    it("tab on last element in modal returns to the close-modal button", function() {
      $("#submit").focus();
      pressTabOnLastElt($("#close-modal"), $("#submit"));
      expect($("#close-modal")).toBeFocused();
    });

    it("shift-tab on close-modal element in modal returns to the last element in modal", function() {
      $("#close-modal").focus();
      pressShiftTabOnFirstElt($("#close-modal"), $("#submit"));
      expect($("#submit")).toBeFocused();
    });

    it("pressing ESC calls 'click' on close-modal element", function() {
      var clicked = false;
      $("#close-modal").click(function(theEvent){
        clicked = true;
      });
      pressEsc($("#close-modal"));
      expect(clicked).toBe(true);
    });

    describe("When modal is closed", function() {

      beforeEach(function () {
        $("#close-modal").click();
      });

      it("sets main page aria-hidden attr to false", function() {
        expect($("#mainPageId")).toHaveAttr("aria-hidden", "false");
      });

      it("sets modal aria-hidden attr to true", function() {
        expect($("#modalId")).toHaveAttr("aria-hidden", "true");
      });

      it("returns focus to focusedElementBeforeModal", function() {
        expect(focusedElementBeforeModal).toBeFocused();
      });

    });

  });

});