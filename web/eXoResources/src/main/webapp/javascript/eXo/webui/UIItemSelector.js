/**
 * Copyright (C) 2009 eXo Platform SAS.
 * 
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 * 
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */

/**
 * Mouse over event, Set highlight to OverItem
 * 
 * @param {Object}
 *          selectedElement focused element
 * @param {boolean}
 *          mouseOver
 */
eXo.webui.UIItemSelector = {

  onOver : function(selectedElement, mouseOver) {
    if (selectedElement.className == "Item") {
      eXo.webui.UIItemSelector.beforeActionHappen(selectedElement);
    }
    if (mouseOver) {
      this.backupClass = selectedElement.className;
      selectedElement.className = "OverItem Item";
      // minh.js.exo
      // this.onChangeItemDetail(selectedElement, true);
    } else {
      selectedElement.className = this.backupClass;
      // this.onChangeItemDetail(selectedElement, false);
    }
  },
  /**
   * Mouse click event, highlight selected item and non-highlight other items
   * There are 3 types of item: Item, OverItem, SeletedItem
   * 
   * @param {Object}
   *          clickedElement
   */
  onClick : function(clickedElement) {
    var itemListContainer = clickedElement.parentNode;
    var allItems = eXo.core.DOMUtil.findDescendantsByClass(itemListContainer,
        "div", "Item");
    eXo.webui.UIItemSelector.beforeActionHappen(clickedElement);
    if (this.allItems.length <= 0)
      return;
    for ( var i = 0; i < allItems.length; i++) {
      if (allItems[i] != clickedElement) {
        allItems[i].className = "Item";
        this.onChangeItemDetail(clickedElement, true);
      } else {
        allItems[i].className = "SelectedItem Item";
        this.backupClass = "SelectedItem Item";
        this.onChangeItemDetail(clickedElement, false);
      }
    }
  },
  /**
   * Change UI of new selected item, selected item will be displayed and others
   * will be hidden
   * 
   * @param {Object}
   *          itemSelected selected item
   * @param {boolean}
   *          mouseOver
   */
  onChangeItemDetail : function(itemSelected, mouseOver) {
    if (!this.allItems || this.allItems.length <= 0)
      return;
    if (mouseOver) {
      for ( var i = 0; i < this.allItems.length; i++) {
        if (this.allItems[i] == itemSelected) {
          this.itemDetails[i].style.display = "block";
        } else {
          this.itemDetails[i].style.display = "none";
        }
      }
    } else {
      for ( var i = 0; i < this.allItems.length; i++) {
        if (this.allItems[i].className == "SelectedItem Item") {
          this.itemDetails[i].style.display = "block";
        } else {
          this.itemDetails[i].style.display = "none";
        }
      }
    }
  },

  /* Pham Thanh Tung added */
  onClickCategory : function(clickedElement, form, component, option) {
    eXo.webui.UIItemSelector.onClick(clickedElement);
    if (eXo.webui.UIItemSelector.SelectedItem == null) {
      eXo.webui.UIItemSelector.SelectedItem = new Object();
    }
    eXo.webui.UIItemSelector.SelectedItem.component = component;
    eXo.webui.UIItemSelector.SelectedItem.option = option;
  },

  /* Pham Thanh Tung added */
  onClickOption : function(clickedElement, form, component, option) {
    var itemDetailList = eXo.core.DOMUtil.findAncestorByClass(clickedElement,
        "ItemDetailList");
    var selectedItems = eXo.core.DOMUtil.findDescendantsByClass(itemDetailList,
        "div", "SelectedItem");
    for ( var i = 0; i < selectedItems.length; i++) {
      selectedItems[i].className = "NormalItem";
    }
    clickedElement.className = "SelectedItem";
    if (eXo.webui.UIItemSelector.SelectedItem == null) {
      eXo.webui.UIItemSelector.SelectedItem = new Object();
    }
    eXo.webui.UIItemSelector.SelectedItem.component = component;
    eXo.webui.UIItemSelector.SelectedItem.option = option;
  },

  /* TODO: Review This Function (Ha's comment) */
  beforeActionHappen : function(selectedItem) {
    DOMUtil = eXo.core.DOMUtil;
    this.uiItemSelector = DOMUtil.findAncestorByClass(selectedItem,
        "UIItemSelector");
    this.itemList = DOMUtil.findAncestorByClass(selectedItem, "ItemList");
    this.itemListContainer = DOMUtil.findAncestorByClass(selectedItem,
        "ItemListContainer");
    this.itemListAray = DOMUtil.findDescendantsByClass(
        this.itemListContainer.parentNode, "div", "ItemList");

    if (this.itemListAray.length > 1) {
      this.itemDetailLists = DOMUtil.findDescendantsByClass(
          this.itemListContainer.parentNode, "div", "ItemDetailList");
      this.itemDetailList = null;
      for ( var i = 0; i < this.itemListAray.length; i++) {
        if (this.itemListAray[i].style.display == "none") {
          this.itemDetailLists[i].style.display = "none";
        } else {
          this.itemDetailList = this.itemDetailLists[i];
          this.itemDetailList.style.display = "block";
        }
      }
    } else {
      this.itemDetailList = DOMUtil.findFirstDescendantByClass(
          this.itemListContainer.parentNode, "div", "ItemDetailList");
    }
    // this.itemDetails =
    // eXo.core.DOMUtil.findChildrenByClass(this.itemDetailList, "div",
    // "ItemDetail");
    this.itemDetails = DOMUtil.findDescendantsByClass(this.itemDetailList,
        "div", "ItemDetail");
    var firstItemDescendant = DOMUtil.findFirstDescendantByClass(this.itemList,
        "div", "Item");
    var firstItemParent = firstItemDescendant.parentNode;
    this.allItems = DOMUtil.findChildrenByClass(firstItemParent, "div", "Item");
  },

  showPopupCategory : function(selectedNode) {
    var DOMUtil = eXo.core.DOMUtil;
    var itemListContainer = DOMUtil.findAncestorByClass(selectedNode,
        "ItemListContainer");
    var uiPopupCategory = DOMUtil.findFirstDescendantByClass(itemListContainer,
        "div", "UIPopupCategory");

    itemListContainer.style.position = "relative";

    if (uiPopupCategory.style.display == "none") {
      uiPopupCategory.style.position = "absolute";
      uiPopupCategory.style.top = "23px";
      uiPopupCategory.style.left = "0px";
      uiPopupCategory.style.display = "block";
      uiPopupCategory.style.width = "100%";
    } else {
      uiPopupCategory.style.display = "none";
    }
  },

  selectCategory : function(selectedNode) {
    var DOMUtil = eXo.core.DOMUtil;
    var uiPopupCategory = DOMUtil.findAncestorByClass(selectedNode,
        "UIPopupCategory");
    var itemListContainer = DOMUtil.findAncestorByClass(selectedNode,
        "OverflowContainer");
    var selectedNodeIndex = eXo.webui.UIItemSelector.findIndex(selectedNode);

    var itemLists = DOMUtil.findDescendantsByClass(itemListContainer, "div",
        "ItemList");
    var itemDetailLists = DOMUtil.findDescendantsByClass(itemListContainer,
        "div", "ItemDetailList");

    for ( var i = 0; i < itemLists.length; i++) {
      if (i != selectedNodeIndex) {
        itemLists[i].style.display = "none";
        itemDetailLists[i].style.display = "none";
      } else {
        itemDetailLists[i].style.display = "block";
        itemLists[i].style.display = "block";
      }
    }
    uiPopupCategory.style.display = "none";
  },

  findIndex : function(object) {
    var parentNode = object.parentNode;
    var objectElements = eXo.core.DOMUtil.findChildrenByClass(parentNode,
        "div", object.className);
    for ( var i = 0; i < objectElements.length; i++) {
      if (objectElements[i] == object)
        return i;
    }
  },

  /**
   * @author dang.tung
   * 
   * TODO To change the template layout in page config Called by
   * UIPageTemplateOptions.java Review UIDropDownControl.java: set javascrip
   * action UIDropDownControl.js : set this method to do
   */
  selectPageLayout : function(id, selectedIndex) {
    var DOMUtil = eXo.core.DOMUtil;
    var uiDropDownControl = document.getElementById(id);
    var itemSelectorAncestor = DOMUtil.findAncestorByClass(uiDropDownControl,
        "ItemSelectorAncestor");
    var itemList = DOMUtil.findDescendantsByClass(itemSelectorAncestor, "div",
        "ItemList");
    var itemSelectorLabel = DOMUtil.findDescendantsByClass(
        itemSelectorAncestor, "a", "OptionItem");
    var uiItemSelector = DOMUtil.findAncestorByClass(uiDropDownControl,
        "UIItemSelector");
    var itemDetailList = DOMUtil.findDescendantsByClass(uiItemSelector, "div",
        "ItemDetailList");
    if (itemList == null)
      return;
    for (i = 0; i < itemSelectorLabel.length; ++i) {
      if (i >= itemList.length)
        continue;
      if (i == selectedIndex) {
        itemList[i].style.display = "block";
        if (itemDetailList.length < 1)
          continue;
        itemDetailList[i].style.display = "block";
        var selectedItem = DOMUtil.findFirstDescendantByClass(itemList[i],
            "div", "SelectedItem");
        if (selectedItem == null)
          continue;
        var setValue = DOMUtil.findDescendantById(selectedItem, "SetValue");
        if (setValue == null)
          continue;
        eval(setValue.innerHTML);
      } else {
        itemList[i].style.display = "none";
        if (itemDetailList.length > 0)
          itemDetailList[i].style.display = "none";
      }
    }
  }
}
