<script setup lang="ts">
import { ref } from "vue";

const src = ref(
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
);

function onFileSelect(event: any) {
  const file = event.files[0];
  const reader = new FileReader();

  reader.onload = async (e) => {
    src.value = e.target?.result as string;
  };

  reader.readAsDataURL(file);
}
</script>
<template>
  <div
    class="bg-surface-0 dark:bg-surface-900 p-4 py-6 md:p-6 border rounded-lg"
  >
    <div class="text-lg font-semibold">Account setting</div>
    <div class="flex flex-col gap-4 mt-4">
      <div class="flex gap-2 items-end">
        <Avatar :image="src" class="mr-2" size="xlarge" />
        <FileUpload
          mode="basic"
          @select="onFileSelect($event)"
          customUpload
          auto
          severity="secondary"
          class="p-button-outlined"
        />
      </div>
      <div>
        <label for="name">Fullname</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText placeholder="Enter your full name" />
        </InputGroup>
      </div>
      <div>
        <label for="email">Email</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText placeholder="Email" />
        </InputGroup>
      </div>
      <div>
        <label for="password">New Password</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password placeholder="new password" :feedback="false" toggleMask />
        </InputGroup>
      </div>
      <div>
        <label for="password">Confirm password</label><br />
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <Password
            placeholder="confirm password"
            :feedback="false"
            toggleMask
          />
        </InputGroup>
      </div>
      <div>
        <Button label="Update" />
      </div>
    </div>
  </div>
</template>
