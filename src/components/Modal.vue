<template lang="pug">
  transition(name="appear")
    .modal
      .modal-window
        p.modal-text Вы выиграли! Повторить?
        .actions
          button.cancel(@click="onCancel") Я уже устал
          button.confirm(@click="onConfirm") Конечно!
</template>

<script>
export default {
  methods: {
    onConfirm() {
      this.$emit('confirm');
    },
    onCancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.modal {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(15, 15, 15, 0.986);
  &-window {
    position: absolute;
    top: 50%;
    left: 50%;
    transition: 0.5s;
    width: 100%;
    min-width: 300px;
    max-width: 450px;
    background: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.849);
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: 900;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    .actions {
      display: flex;
      justify-content: center;
      button {
        font-size: 18px;
        font-weight: 900;
        padding: 10px;
        border: none;
        width: 50%;
        cursor: pointer;
      }
      .cancel {
        background: $red-light;
        color: rgb(255, 255, 255);
      }
      .confirm {
        background: $green-light;
        color: rgb(255, 255, 255);
      }
    }
  }
  &-text {
    padding-bottom: 25px;
    margin-bottom: 0;
  }
}

.appear-enter {
  opacity: 0;
}

.appear-enter .modal-window {
  transform: translate(-75%, -50%);
}

.appear-enter-active {
  transition: 0.5s;
}

.appear-leave-active .modal-window {
  transform: translate(0, -50%);
}

.appear-leave-active {
  opacity: 0;
  transition: 0.5s;
}
</style>
