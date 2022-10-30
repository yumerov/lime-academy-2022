# Token Bridge

## Draft diagram

```mermaid
graph TD;
    A[User] -->|interacts with| B[Backend]
    B -->|locks/destroys| C[Network A]
    B -->|unlocks/releases| D[Network B]
```